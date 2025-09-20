import { inject, Injectable, signal, computed } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { from, Observable, tap } from 'rxjs';
import { AuthService } from '../auth-service';
import { AppUser, UserRole } from '../../../models/user.model';



@Injectable({ providedIn: 'root' })
export class UserService {
  private firestore = inject(Firestore);
  private auth = inject(AuthService);

  public users = signal<(AppUser & { uid: string })[]>([]);

  public currentUser = computed(() => this.auth.currentUser());

  public currentUserRole = computed<UserRole>(() => {
    const current = this.currentUser();
    const user = this.users().find(u => u.uid === current?.uid);
    return user?.role ?? 'user';
  });

  public canChangeRoles = computed(() => this.isAdmin(this.currentUserRole()));
  public canCreateCategories = computed(() => this.canCreateCategoriesFn(this.currentUserRole()));

  constructor() {
    this.loadUsers();
  }

  public updateUserRole(uid: string, role: UserRole): Observable<void> {
    const userDoc = doc(this.firestore, 'users', uid);
    return from(updateDoc(userDoc, { role })).pipe(
      tap(() => {
        this.users.update(current =>
          current.map(user => user.uid === uid ? { ...user, role } : user)
        );
      })
    );
  }

  private loadUsers() {
    const usersCollection = collection(this.firestore, 'users');
    collectionData(usersCollection, { idField: 'uid' }).subscribe(users => {
      this.users.set(
        (users as (AppUser & { uid: string; role?: UserRole })[]).map(u => ({
          ...u,
          role: u.role ?? 'user' 
        }))
      );
    });
  }

  public isAdmin(role: UserRole): boolean {
    return role === 'admin';
  }

  public canCreateCategoriesFn(role: UserRole): boolean {
    return role === 'admin' || role === 'super_user';
  }
}

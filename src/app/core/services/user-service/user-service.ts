import { inject, Injectable, signal, computed, effect } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { firstValueFrom, from, Observable, tap } from 'rxjs';
import { AuthService } from '../auth-service';
import { AppUser, UserRole } from '../../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  public firestore = inject(Firestore);
  public auth = inject(AuthService);

  public users = signal<(AppUser & { uid: string })[]>([]);

  public currentUser = computed(() => this.auth.currentUser());
  public currentUserData = signal<AppUser | null>(null);


  public currentUserRole = computed<UserRole>(() => {
    return this.currentUserData()?.role ?? 'user';
  });

  public canChangeRoles = computed(() => this.isAdmin(this.currentUserRole()));
  public canCreateCategories = computed(() => this.canCreateCategoriesFn(this.currentUserRole()));

  constructor() {
    this.loadUsers();
    effect(() => {
      const current = this.currentUser();
      if (current) {
        const userDoc = doc(this.firestore, 'users', current.uid);
        docData(userDoc).subscribe((user) => {
          this.currentUserData.set(user as AppUser);
        });
      } else {
        this.currentUserData.set(null);
      }
    });
  }

  public updateUserRole(uid: string, role: UserRole): Observable<void> {
    const userDocument = doc(this.firestore, 'users', uid);
    return from(updateDoc(userDocument, { role })).pipe(
      tap(() => {
        this.users.update((current) =>
          current.map((user) => (user.uid === uid ? { ...user, role } : user)),
        );
      }),
    );
  }

  public loadUsers(): void {
    const usersCollection = collection(this.firestore, 'users');
    collectionData(usersCollection, { idField: 'uid' }).subscribe((users) => {
      this.users.set(
        (users as (AppUser & { uid: string; role?: UserRole })[]).map((u) => ({
          ...u,
          role: u.role ?? 'user',
        })),
      );
    });
  }

  public isAdmin(role: UserRole): boolean {
    return role === 'admin';
  }

  public canCreateCategoriesFn(role: UserRole): boolean {
    return role === 'admin' || role === 'super_user';
  }

  public prefetchUsersAsync(): Promise<void> {
    const usersCollection = collection(this.firestore, 'users');
    return firstValueFrom(
      collectionData(usersCollection, { idField: 'uid' }).pipe(
        tap((users) =>
          this.users.set(
            (users as (AppUser & { uid: string; role?: UserRole })[]).map((u) => ({
              ...u,
              role: u.role ?? 'user',
            })),
          ),
        ),
      ),
    ).then(() => undefined);
  }
}

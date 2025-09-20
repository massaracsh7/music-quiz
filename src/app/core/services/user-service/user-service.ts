import { inject, Injectable, signal } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { from, Observable, tap } from 'rxjs';
import { AppUser, UserRole } from '../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public firestore = inject(Firestore);
  public users = signal<(AppUser & { uid: string })[]>([]);

  constructor() {
    this.loadUsers();
  }

  public updateUserRole$(uid: string, role: UserRole): Observable<void> {
    const userDoc = doc(this.firestore, 'users', uid);
    return from(updateDoc(userDoc, { role })).pipe(
      tap(() => {
        this.users.update((current) =>
          current.map(user => user.uid === uid ? { ...user, role } : user)
        );
      })
    );
  }
  
  private loadUsers() {
    const usersCollection = collection(this.firestore, 'users');
    collectionData(usersCollection, { idField: 'uid' }).subscribe(users => {
      this.users.set(users as (AppUser & { uid: string })[]);
    });
  }

}

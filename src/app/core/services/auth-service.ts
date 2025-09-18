import { inject, Injectable, signal, computed } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User, authState } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { from, Observable, tap, switchMap, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public auth = inject(Auth);
  public firestore = inject(Firestore);

  public currentUser = signal<User | null>(null);
  public currentUserName = computed(() => this.currentUser()?.displayName ?? '');
  public isLoggedIn = computed(() => !!this.currentUser());
  public isAdmin = signal(false);

  constructor() {
    authState(this.auth).subscribe(async (user) => {
      this.currentUser.set(user);
      if (user) {
        const snap = await getDoc(doc(this.firestore, 'users', user.uid));
        const role = snap.exists() ? snap.data()['role'] : 'user';
        this.isAdmin.set(role === 'admin');
      } else {
        this.isAdmin.set(false);
      }
    });
  }

  public login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(async (cred) => {
        const snap = await getDoc(doc(this.firestore, 'users', cred.user.uid));
        const role = snap.exists() ? snap.data()['role'] : 'user';

        this.currentUser.set({
          ...cred.user,
          displayName: cred.user.displayName ?? '',
        } as User);

        this.isAdmin.set(role === 'admin');

        return cred.user;
      })
    );
  }

  public register(email: string, password: string, username: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((cred) =>
        from(updateProfile(cred.user, { displayName: username })).pipe(
          switchMap(() =>
            from(setDoc(doc(this.firestore, "users", cred.user.uid), {
              role: "user",
              email,
            }))
          ),
          tap(() => {
            this.currentUser.set({
              ...cred.user,
              displayName: username,
            } as User);
          }),
          map(() => cred.user),
        )
      )
    );
  }

  public logout(): Observable<void> {
    this.isAdmin.set(false);
    return from(signOut(this.auth)).pipe(tap(() => this.currentUser.set(null)));
  }

}

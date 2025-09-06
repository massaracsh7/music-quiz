import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { from, map, switchMap, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  currentUserName = signal<string | null>(null);
  idToken = signal<string | null>(null);

  public login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential =>
        from(userCredential.user.getIdToken()).pipe(
          tap(token => {
            this.idToken.set(token);
            this.currentUserName.set(userCredential.user.displayName);
            console.log('Login success:', {
              name: this.currentUserName(),
              token: this.idToken(),
            });
          }),
          map(() => userCredential.user)
        )
      )
    );
  }

  public register(email: string, password: string, username: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential =>
        from(updateProfile(userCredential.user, { displayName: username })).pipe(
          switchMap(() => from(userCredential.user.getIdToken())),
          tap(token => {
            this.idToken.set(token);
            this.currentUserName.set(username);
            console.log('Register success:', {
              name: this.currentUserName(),
              token: this.idToken(),
            });
          }),
          map(() => userCredential.user)
        )
      )
    );
  }

  public logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        this.idToken.set(null);
        this.currentUserName.set(null);
        console.log('Logged out, signals cleared');
      })
    );
  }
}

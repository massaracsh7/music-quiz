import { inject, Injectable, signal, computed, effect } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { from, switchMap, tap, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public auth = inject(Auth);

  public idToken = signal<string | null>(localStorage.getItem('idToken'));
  public currentUserName = signal<string | null>(localStorage.getItem('currentUserName'));

  public isLoggedIn = computed(() => !!this.idToken());

  private _storageEffect = effect(() => {
    if (this.idToken()) {
      localStorage.setItem('idToken', this.idToken()!);
      localStorage.setItem('currentUserName', this.currentUserName() ?? '');
    } else {
      localStorage.removeItem('idToken');
      localStorage.removeItem('currentUserName');
    }
  });

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        user.getIdToken().then(token => this.idToken.set(token));
        this.currentUserName.set(user.displayName);
      } else {
        this.idToken.set(null);
        this.currentUserName.set(null);
      }
    });
  }

  public login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential =>
        from(userCredential.user.getIdToken()).pipe(
          tap(token => {
            this.currentUserName.set(userCredential.user.displayName);
            this.idToken.set(token);
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
            this.currentUserName.set(username);
            this.idToken.set(token);
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
      })
    );
  }
}

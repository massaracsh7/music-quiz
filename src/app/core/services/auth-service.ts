import { inject, Injectable, signal, computed } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User, authState } from '@angular/fire/auth';
import { from, Observable, tap, switchMap, map } from 'rxjs';

export const ADMIN_UIDS = ['VPipMaBGMVYzTWSwW1xvCuocpEy2', 'n1zXfWPESnP1pqy3c5CJf69WXk12'];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  public currentUser = signal<User | null>(null);
  public currentUserName = computed(() => this.currentUser()?.displayName ?? '');
  public isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    authState(this.auth).subscribe((user) => this.currentUser.set(user));
  }

  public login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((cred) => {
        this.currentUser.set({
          ...cred.user,
          displayName: cred.user.displayName ?? '',
        } as User);
      }),
      map((cred) => cred.user),
    );
  }

  public register(email: string, password: string, username: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((cred) =>
        from(updateProfile(cred.user, { displayName: username })).pipe(
          switchMap(() => from(cred.user.getIdToken())),
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
    return from(signOut(this.auth)).pipe(tap(() => this.currentUser.set(null)));
  }

  public isAdmin = computed(() =>
  this.currentUser() ? ADMIN_UIDS.includes(this.currentUser()!.uid) : false
);
}

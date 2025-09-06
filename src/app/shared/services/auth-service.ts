import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { from, map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(email: string, password: string, username: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential =>
        from(updateProfile(userCredential.user, { displayName: username })).pipe(
          map(() => userCredential.user)
        )
      ))
  }

  logout() {
    return from(signOut(this.auth));
  }
}
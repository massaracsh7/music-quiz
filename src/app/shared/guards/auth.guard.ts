import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { ToastService } from '../services/toast/toast';
import { firstValueFrom } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';

export const authGuard: CanActivateFn = async () => {
  const authServer = inject(AuthService);
  const auth = inject(Auth);
  const router = inject(Router);
  const toast = inject(ToastService);
  const user = authServer.currentUser() || await firstValueFrom(authState(auth));
  if (user) {
    return true;
  }
  toast.show('Login or register to play game', 'error');
  return router.createUrlTree(['/login']);
};

// export const adminGuard: CanActivateFn = () => {
//   const auth = inject(AuthService);
//   const router = inject(Router);
//   const toast = inject(ToastService);
//   if (auth.isAdmin()) {
//     return true;
//   }
//   toast.show('You need admin rights to access this page', 'error');

//   return router.createUrlTree(['/']);
// };

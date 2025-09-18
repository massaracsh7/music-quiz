import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { ToastService } from '../services/toast/toast';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);
  if (auth.isLoggedIn()) {
    return true;
  }
  toast.show('Login or register to play game', 'error');
  return router.createUrlTree(['/login']);
};

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);
  if (auth.isAdmin()) {
    return true;
  }
  toast.show('You need admin rights to access this page', 'error');

  return router.createUrlTree(['/']);
};

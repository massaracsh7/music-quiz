import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { ToastService } from '../services/toast/toast';
import { firstValueFrom } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { UserRole } from '../../models/user.model';
import { UserService } from '../../core/services/user-service/user-service';

export const authGuard: CanActivateFn = async () => {
  const authServer = inject(AuthService);
  const auth = inject(Auth);
  const router = inject(Router);
  const toast = inject(ToastService);
  const user = authServer.currentUser() || (await firstValueFrom(authState(auth)));
  if (user) {
    return true;
  }
  toast.show('Login or register to play game', 'error');
  return router.createUrlTree(['/auth/login']);
};

export const roleGuard =
  (allowedRoles: UserRole[]): CanActivateFn =>
    async () => {
      const userService = inject(UserService);
      const router = inject(Router);
      const toast = inject(ToastService);
      if (userService.users()!.length === 0) {
        await userService.prefetchUsersAsync();
      }

      const role = userService.currentUserRole();

      if (allowedRoles.includes(role)) {
        return true;
      }

      toast.show('You need rights to access this page', 'error');
      return router.createUrlTree(['/']);
    };

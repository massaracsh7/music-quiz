import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { ToastService } from '../services/toast/toast';
import { firstValueFrom } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { UserRole } from '../../models/user.model';
import { UserService } from '../../core/services/user-service/user-service';
import { TranslateService } from '@ngx-translate/core';

export const authGuard: CanActivateFn = async () => {
  const authServer = inject(AuthService);
  const auth = inject(Auth);
  const router = inject(Router);
  const toast = inject(ToastService);
  const translate = inject(TranslateService);

  const user = authServer.currentUser() || (await firstValueFrom(authState(auth)));
  if (user) {
    return true;
  }
  toast.show(
    translate.instant('TOAST.LOGIN_REQUIRED'),
    'error'
  ); return router.createUrlTree(['/auth/login']);
};

export const roleGuard =
  (allowedRoles: UserRole[]): CanActivateFn =>
    async () => {
      const userService = inject(UserService);
      const router = inject(Router);
      const toast = inject(ToastService);
      const translate = inject(TranslateService);
      if (userService.users()!.length === 0) {
        await userService.prefetchUsersAsync();
      }

      const role = userService.currentUserRole();

      if (allowedRoles.includes(role)) {
        return true;
      }

      toast.show(
        translate.instant('TOAST.ACCESS_DENIED'),
        'error'
      ); return router.createUrlTree(['/']);
    };

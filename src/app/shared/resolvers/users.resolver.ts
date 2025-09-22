import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../../core/services/user-service/user-service';

export const usersResolver: ResolveFn<ReturnType<UserService['loadUsers']>> = () => {
  const userService = inject(UserService);
  return userService.loadUsers();
};
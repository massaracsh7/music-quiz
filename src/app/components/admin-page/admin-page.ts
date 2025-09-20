import { Component, inject, computed, signal, DestroyRef } from '@angular/core';
import { UserService } from '../../core/services/user-service/user-service';
import { AppUser, UserInfo, UserRole } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from '../../shared/services/toast/toast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.scss',
  imports: [CommonModule, FormsModule],

})
export class AdminPage {
  private userService = inject(UserService);

  public users = this.userService.users;

  public roles: UserRole[] = ['admin', 'super_user', 'user'];
  public get options() {
    return this.roles.map(role => ({ value: role, label: role }));
  }

  public currentUserRole = this.userService.currentUserRole;
  public canChangeRoles = this.userService.canChangeRoles;
  public canCreateCategories = this.userService.canCreateCategories;
  public toast = inject(ToastService);
  private destroyRef = inject(DestroyRef);


  public changeRole(user: UserInfo, newRole: UserRole) {
    if (!this.canChangeRoles()) return;
    this.userService.updateUserRole(user.uid, newRole).pipe(
      tap(() => {
        this.toast.show(`Role of "${user.email}" changed successfully`, 'success');
      }),
      catchError(err => {
        this.toast.show(`Failed to change role: ${err.message}`, 'error');
        return of();
      }),      
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
  public sortDirection = signal<'asc' | 'desc'>('asc');

  public sortedUsers = computed(() => {
    return [...this.users()].sort((a, b) => {
      if (a.role < b.role) return this.sortDirection() === 'asc' ? -1 : 1;
      if (a.role > b.role) return this.sortDirection() === 'asc' ? 1 : -1;
      return 0;
    });
  });

  public toggleSort() {
    this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
  }
}

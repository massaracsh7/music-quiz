import { Component, inject, computed } from '@angular/core';
import { UserService } from '../../core/services/user-service/user-service';
import { AppUser, UserInfo, UserRole } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  public   options = [
    { value: 'admin', label: 'admin' },
    { value: 'super_user', label: 'super_user' },
    { value: 'user', label: 'user' },
  ];

  public currentUserRole = computed(() => this.userService.currentUserRole());

  public canChangeRoles = computed(() => this.userService.isAdmin(this.currentUserRole()));
  public canCreateCategories = computed(() => this.userService.canCreateCategoriesFn(this.currentUserRole()));

  public changeRole(user: UserInfo, newRole: UserRole) {
    if (this.canChangeRoles()) {
      this.userService.updateUserRole(user.uid, newRole as UserRole).subscribe();
    }
  }
}

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
  public get options() {
    return this.roles.map(role => ({ value: role, label: role }));
  }

  public currentUserRole = this.userService.currentUserRole;
  public canChangeRoles = this.userService.canChangeRoles;
  public canCreateCategories = this.userService.canCreateCategories;

  public changeRole(user: UserInfo, newRole: UserRole) {
    if (this.canChangeRoles()) {
      this.userService.updateUserRole(user.uid, newRole as UserRole).subscribe();
    }
  }
}

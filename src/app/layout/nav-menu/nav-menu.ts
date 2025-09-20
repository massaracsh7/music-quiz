import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth-service';
import { NAV_LIST } from './nav-list.const';
import { UserService } from '../../core/services/user-service/user-service';

@Component({
  selector: 'app-nav-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss',
  standalone: true,
})
export class NavMenu {
  public users = inject(UserService);

  public navList = NAV_LIST;

  public onlyAdminRoutes = ['/admin'];
  public superUserRoutes = ['/create-category'];

  public isShowRoute(path: string): boolean {
    if (this.superUserRoutes.includes(path)) {
      return this.users.canCreateCategories();
    }
    if (this.onlyAdminRoutes.includes(path)) {
      return this.users.canChangeRoles();
    }
    return true;
  }
}

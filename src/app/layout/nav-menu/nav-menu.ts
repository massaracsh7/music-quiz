import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth-service';
import { NAV_LIST } from './nav-list.const';

@Component({
  selector: 'app-nav-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss',
  standalone: true,
})
export class NavMenu {
  public auth = inject(AuthService);

  public navList = NAV_LIST;

  public onlyAdminRoutes = ['/create-category'];

  public isShowRoute(path: string): boolean {
    return !this.onlyAdminRoutes.includes(path) || this.auth.isAdmin();
  }
}

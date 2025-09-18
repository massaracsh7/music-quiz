import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NAV_LIST_ADMIN, NAV_LIST_BASE } from './nav-list.const';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-nav-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss',
  standalone: true,
})
export class NavMenu {
  public auth = inject(AuthService);

  public navList = computed(() => (this.auth.isAdmin() ? NAV_LIST_ADMIN : NAV_LIST_BASE));
}

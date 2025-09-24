import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NAV_LIST } from './nav-list.const';
import { UserService } from '../../core/services/user-service/user-service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-menu',
  imports: [RouterModule, CommonModule, TranslatePipe],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss',
  standalone: true,
})
export class NavMenu {
  public users = inject(UserService);

  public navList = NAV_LIST;

  // public onlyAdminRoutes = ['/admin'];
  // public superUserRoutes = ['/create-category'];

  public navShowList = computed(() =>
    this.navList.filter((item) => {
      if (item.path === '/create-category') {
        return this.users.canCreateCategories();
      }
      if (item.path === '/admin') {
        return this.users.canChangeRoles();
      }
      return true;
    }),
  );
}

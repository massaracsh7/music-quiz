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

  public navShowList = computed(() =>
    this.navList.filter((item) => {
      switch (item.path) {
        case '/categories': {
          return this.users.canCreateCategories();
        }
        case '/admin': {
          return this.users.canChangeRoles();
        }
        default: {
          return true;
        }
      }
    }),
  );
}

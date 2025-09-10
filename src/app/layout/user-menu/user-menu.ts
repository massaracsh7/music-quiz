import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  imports: [RouterModule],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss'
})
export class UserMenu {
  auth = inject(AuthService);

  logout() {
    this.auth.logout().subscribe();
  }

}

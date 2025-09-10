import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  imports: [RouterModule],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
})
export class UserMenu {
  public auth = inject(AuthService);

  public logout(): void {
    this.auth.logout().subscribe();
  }
}

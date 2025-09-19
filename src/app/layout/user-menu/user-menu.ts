import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  imports: [RouterModule],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
})
export class UserMenu {
  public auth = inject(AuthService);
  public router = inject(Router);

  public logout(): void {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

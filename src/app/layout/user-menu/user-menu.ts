import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user-service/user-service';

@Component({
  selector: 'app-user-menu',
  imports: [RouterModule],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
})
export class UserMenu {
  public auth = inject(AuthService);
  public user = inject(UserService);
  public router = inject(Router);

  public logout(): void {
    this.auth.logout().subscribe(() => {
      this.user.currentUserData.set(null);
      this.router.navigate(['/']);
    });
  }
}

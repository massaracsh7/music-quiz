import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth-service/auth-service';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-menu',
  imports: [RouterModule, TranslatePipe],
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

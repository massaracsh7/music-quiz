import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-menu',
  imports: [RouterModule, TranslatePipe],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
})
export class UserMenu {
  public auth = inject(AuthService);

  public logout(): void {
    this.auth.logout().subscribe();
  }
}

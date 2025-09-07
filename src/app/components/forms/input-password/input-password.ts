import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { getErrorMessage } from '../../../shared/utils/get-error-message';
import { CommonModule } from '@angular/common';
import { ShowPasswordPipe } from '../../../shared/pipes/show-password-pipe';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ShowPasswordPipe],
  templateUrl: './input-password.html',
  styleUrl: './input-password.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPassword {
  @Input({ required: true }) control!: FormControl;

  public showPassword = signal(false);
  public errorId = 'password-error';

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  public getErrorMessage = getErrorMessage;
}

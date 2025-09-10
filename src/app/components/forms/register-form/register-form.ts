import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service';
import { firebasePasswordValidator } from '../../../shared/utils/validators';
import { getErrorMessage } from '../../../shared/utils/get-error-message';
import { getAuthError } from '../../../shared/utils/get-auth-error';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ShowPasswordPipe } from '../../../shared/pipes/show-password-pipe';
import { CommonModule } from '@angular/common';
import { InputPassword } from '../input-password/input-password';
import { ToastService } from '../../../shared/services/toast/toast';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputPassword],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterForm {
  public router = inject(Router);
  public auth = inject(AuthService);
  public toast = inject(ToastService);
  public error = signal('');
  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [firebasePasswordValidator()],
      updateOn: 'blur',
    }),
  });

  public getErrorMessage = getErrorMessage;

  private destroyRef = inject(DestroyRef);

  public submit(): void {
    if (this.form.invalid) return;
    this.error.set('');

    const email = this.form.get('email')!.value!;
    const password = this.form.get('password')!.value!;
    const name = this.form.get('name')!.value!;

    this.auth
      .register(email, password, name)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          console.error('Register error:', error);
          this.error.set(getAuthError(error));
          return of(null);
        }),
      )
      .subscribe((user) => {
        if (user) {
          this.toast.show(`Welcome, ${user.displayName}!`, 'success');
          this.router.navigate(['/']);
        }
      });
  }
}

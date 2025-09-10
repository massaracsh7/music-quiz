import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service';
import { firebasePasswordValidator } from '../../../shared/utils/validators';
import { getErrorMessage } from '../../../shared/utils/get-error-message';
import { getAuthError } from '../../../shared/utils/get-auth-error';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { InputPassword } from '../input-password/input-password';
import { ToastService } from '../../../shared/services/toast/toast';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputPassword],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  public router = inject(Router);
  public auth = inject(AuthService);
  public toast = inject(ToastService);
  public error = signal('');
  public form = new FormGroup({
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

    const email = this.form.get('email')!.value!;
    const password = this.form.get('password')!.value!;

    this.auth
      .login(email, password)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          console.error('Login error:', error);
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

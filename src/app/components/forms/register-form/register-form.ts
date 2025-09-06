import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth-service';
import { firebasePasswordValidator } from '../../../shared/utils/validators';
import { getErrorMessage } from '../../../shared/utils/get-error-message';
import { getAuthError } from '../../../shared/utils/get-auth-error';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  public auth = inject(AuthService);
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

  public submit(): void {
    if (this.form.invalid) return;
    this.error.set('');
    const email = this.form.get('email')!.value!;
    const password = this.form.get('password')!.value!;
    const name = this.form.get('name')!.value!;
    this.auth.register(email, password, name).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Register error:', error);
        this.error.set(getAuthError(error));
      },
    });
  }
}

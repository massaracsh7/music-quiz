import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth-service';
import { firebasePasswordValidator } from '../../../shared/utils/validators';
import { getErrorMessage } from '../../../shared/utils/getErrorMessage';
import { Auth } from '@angular/fire/auth';
import { getAuthError } from '../../../shared/utils/getAuthError';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {
  auth = inject(AuthService);
  authFirebase = inject(Auth);
  error = signal('');
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [firebasePasswordValidator(this.authFirebase)],
      updateOn: 'blur'
    })
  });

  submit() {
    if (this.form.invalid) return;

    const email = this.form.get('email')!.value!;
    const password = this.form.get('password')!.value!;

    this.auth.login(email, password).subscribe({
      next: (userCredential) => {
        console.log('Signed in user:', userCredential.user);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.error.set(getAuthError(err));
        

      }
    });
  }

  getErrorMessage = getErrorMessage;
}

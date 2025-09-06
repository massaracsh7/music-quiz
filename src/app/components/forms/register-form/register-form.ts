import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth-service';
import { firebasePasswordValidator } from '../../../shared/utils/validators';
import { getErrorMessage } from '../../../shared/utils/getErrorMessage';
import { getAuthError } from '../../../shared/utils/getAuthError';


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss'
})
export class RegisterForm {
  auth = inject(AuthService);

  error = signal('');
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [firebasePasswordValidator()],
      updateOn: 'blur'
    })
  });

  submit() {
    if (this.form.invalid) return;
    this.error.set('');
    const email = this.form.get('email')!.value!;
    const password = this.form.get('password')!.value!;
    const name = this.form.get('name')!.value!;
    this.auth.register(email, password, name).subscribe({
      next: (userCredential) => {
        console.log('Signed in user:', userCredential.displayName);
      },
      error: (err) => {
        console.error('Register error:', err);
        this.error.set(getAuthError(err));
      }
    });
  }

  getErrorMessage = getErrorMessage;
}

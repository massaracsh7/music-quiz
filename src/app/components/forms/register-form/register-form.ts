import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth-service';
import { firebasePasswordValidator } from '../../../shared/utils/validators';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss'
})
export class RegisterForm {
  auth = inject(AuthService);
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [firebasePasswordValidator()],
      updateOn: 'blur'
    })
  });

  submit() {
    if (this.form.invalid) return;

    const email = this.form.get('email')!.value!;
    const password = this.form.get('password')!.value!;
    const name = this.form.get('name')!.value!;
    this.auth.register(email, password, name).subscribe({
      next: (userCredential) => {
        console.log('Signed in user:', userCredential.displayName);
      },
      error: (err) => {
        console.error('Register error:', err);
      }
    });
  }
}

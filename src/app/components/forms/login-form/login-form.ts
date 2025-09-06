import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/auth-service';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {
  private fb = inject(FormBuilder);
  auth = inject(AuthService)

  form = this.fb.group({
    email: [''],
    password: ['']
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
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/auth-service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss'
})
export class RegisterForm {
  private fb = inject(FormBuilder);
  auth = inject(AuthService);

  form = this.fb.group({
    name: [''],
    email: [''],
    password: ['']
  });

  submit() {
    if (this.form.invalid) return;
    const email = this.form.get('email')!.value!;
    const password = this.form.get('password')!.value!;
    const name = this.form.get('name')!.value!;
    // console.log(name, email, password);
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

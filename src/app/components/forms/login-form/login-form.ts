import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: [''],
    password: ['']
  });

  submit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    console.log(email, password);
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss'
})
export class RegisterForm {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: [''],
    email: [''],
    password: ['']
  });

  submit() {
    if (this.form.invalid) return;
    const { name, email, password } = this.form.value;
    console.log(name, email, password);

  }
}

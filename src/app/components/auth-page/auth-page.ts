import { Component } from '@angular/core';
import { LoginForm } from '../forms/login-form/login-form';
import { RegisterForm } from '../forms/register-form/register-form';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginForm, RegisterForm],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss'
})
export class AuthPage {

}

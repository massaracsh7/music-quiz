import { Component } from '@angular/core';
import { LoginForm } from '../forms/login-form/login-form';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginForm],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss'
})
export class AuthPage {

}

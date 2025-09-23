import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { LoginForm } from '../forms/login-form/login-form';
import { RegisterForm } from '../forms/register-form/register-form';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginForm, RegisterForm, CommonModule],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPage {
  public router = inject(Router);
  public mode = input<'login' | 'register'>('login');

  public isLogin = computed(() => this.mode() === 'login');
  public isRegister = computed(() => this.mode() === 'register');

  public loginTitle = 'Login to Your Account';
  public registerTitle = 'Create a New Account';
}

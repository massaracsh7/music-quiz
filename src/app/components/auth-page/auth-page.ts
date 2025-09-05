import { Component, computed, inject } from '@angular/core';
import { LoginForm } from '../forms/login-form/login-form';
import { RegisterForm } from '../forms/register-form/register-form';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginForm, RegisterForm],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss'
})
export class AuthPage {
  private router = inject(Router);
    currentPath = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  isLogin = computed(() => this.router.url.endsWith('login'));
  isRegister = computed(() => this.router.url.endsWith('register'));
}

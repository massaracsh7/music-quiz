import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./components/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth-page/auth-page').then((m) => m.AuthPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth-page/auth-page').then((m) => m.AuthPage),
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('./components/leaderboard-page/leaderboard-page').then((m) => m.LeaderboardPage),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./components/not-found-page/not-found-page').then((m) => m.NotFoundPage),
  },
  { path: '**', redirectTo: '404' },
];

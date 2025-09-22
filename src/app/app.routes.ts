import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './shared/guards/auth.guard';
import { usersResolver } from './shared/resolvers/users.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./components/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'game',
    loadComponent: () => import('./components/game-page/game-page').then((m) => m.GamePage),
    canActivate: [authGuard],
  },
  {
    path: 'game/:categoryId',
    loadComponent: () =>
      import('./components/game-page/game-page').then(m => m.GamePage),
    canActivate: [authGuard],
  },
  {
    path: 'auth/:mode',
    loadComponent: () =>
      import('./components/auth-page/auth-page').then(m => m.AuthPage),
    resolve: {users: usersResolver}
  },  
  { path: 'login', redirectTo: 'auth/login' },
  { path: 'register', redirectTo: 'auth/register' },
  {
    path: 'leaderboard',
    loadComponent: () =>
      import('./components/leaderboard-page/leaderboard-page').then((m) => m.LeaderboardPage),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about-us-page/about-us-page').then((m) => m.AboutUsPage),
  },
  {
    path: 'create-category',
    loadComponent: () =>
      import('./components/create-category-page/create-category-page').then(
        (m) => m.CreateCategoryPage,
      ),
    canActivate: [roleGuard(['admin', 'super_user'])],
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin-page/admin-page').then((m) => m.AdminPage),
    canActivate: [roleGuard(['admin'])],
  },
  {
    path: '404',
    loadComponent: () =>
      import('./components/not-found-page/not-found-page').then((m) => m.NotFoundPage),
  },
  { path: '**', redirectTo: '404' },
];

import { Injectable, signal } from '@angular/core';

@Injectable()
export class Theme {
theme = signal<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light'
  );

  constructor() {
    document.documentElement.setAttribute('data-bs-theme', this.theme());
  }

  setTheme(newTheme: 'light' | 'dark') {
    this.theme.set(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  toggleTheme() {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }
}

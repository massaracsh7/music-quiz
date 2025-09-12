import { Injectable, signal } from '@angular/core';

@Injectable()
export class Theme {
  theme = signal<'light' | 'dark'>('light');

  setTheme(newTheme: 'light' | 'dark') {
    this.theme.set(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  }

  toggleTheme() {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }
}

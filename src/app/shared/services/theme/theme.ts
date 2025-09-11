import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Theme {
  theme = signal<'light' | 'dark'>('dark');

  setTheme(newTheme: 'light' | 'dark') {
    this.theme.set(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  }

  toggleTheme() {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }
}

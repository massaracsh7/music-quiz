import { Injectable, signal } from '@angular/core';

@Injectable()
export class Theme {
  public theme = signal<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') ?? 'dark',
  );

  constructor() {
    document.documentElement.dataset['bsTheme'] = this.theme();
  }

  public setTheme(newTheme: 'light' | 'dark'): void {
    this.theme.set(newTheme);
    document.documentElement.dataset['bsTheme'] = newTheme;
    localStorage.setItem('theme', newTheme);
  }

  public toggleTheme(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }
}

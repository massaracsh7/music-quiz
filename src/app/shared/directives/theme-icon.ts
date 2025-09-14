import { Directive, HostBinding, inject, OnInit } from '@angular/core';
import { Theme } from '../services/theme/theme';

@Directive({
  selector: '[appThemeIcon]',
})
export class ThemeIcon {
  public theme = inject(Theme);

  @HostBinding('class')
  public get iconClass(): string {
    return `bi ${this.theme.theme() === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill'}`;
  }
}

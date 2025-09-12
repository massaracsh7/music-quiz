import { Directive, HostBinding, inject } from '@angular/core';
import { Theme } from '../services/theme/theme';

@Directive({
  selector: '[appThemeIcon]'
})
export class ThemeIcon {
  private theme = inject(Theme);
  ngOnInit() {}

  @HostBinding('class') 
  get iconClass(): string {
    return `bi ${this.theme.theme() === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill'}`;
  }
}

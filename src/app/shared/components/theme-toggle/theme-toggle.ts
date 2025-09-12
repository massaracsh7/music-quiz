import { Component, inject } from '@angular/core';
import { Theme } from '../../services/theme/theme';
import { CommonModule } from '@angular/common';
import { ThemeIcon } from '../../directives/theme-icon';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule, ThemeIcon],
  providers: [Theme],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
  standalone: true
})
export class ThemeToggle {
  public theme = inject(Theme);
}

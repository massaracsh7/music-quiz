import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavMenu } from '../nav-menu/nav-menu';
import { UserMenu } from '../user-menu/user-menu';
import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';
import { LanguageService } from '../../core/services/language-service/language-service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NavMenu, UserMenu, ThemeToggle, UpperCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  public currentLang = computed(() => this.languageService.currentLang());
  constructor(private languageService: LanguageService) {}
  public switchLang(lang: string) {
    this.languageService.switchLang(lang);
    console.log(this.currentLang());
  }
}

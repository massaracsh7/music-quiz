import { Component, computed } from '@angular/core';
import { LanguageService } from '../../core/services/language-service/language-service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-lang-switcher',
  imports: [UpperCasePipe],
  templateUrl: './lang-switcher.html',
  styleUrl: './lang-switcher.scss'
})
export class LangSwitcher {
  public currentLang = computed(() => this.languageService.currentLang());
  constructor(private languageService: LanguageService) {}
  public switchLang(lang: string) {
    this.languageService.switchLang(lang);
  }
}

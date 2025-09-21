import { computed, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public translateService: TranslateService = inject(TranslateService);
  public currentLang = signal('en');
  public languages = ['en', 'be', 'ru'];

  constructor() {
    this.translateService.addLangs(this.languages);
    const browserLang = this.translateService.getBrowserLang();
    if (browserLang) this.translateService.use(browserLang);

    this.translateService.onLangChange
      .pipe(takeUntilDestroyed())
      .subscribe((event) => this.currentLang.set(event.lang));
  }

  public switchLang(lang: string) {
    this.translateService.use(lang);
    this.currentLang.set(lang);
  }

  public getCurrentLang(): void {
    this.translateService.getCurrentLang();
  }
}

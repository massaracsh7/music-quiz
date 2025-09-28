import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public translateService: TranslateService = inject(TranslateService);
  public currentLang = signal('en');
  public languages = ['en', 'be', 'ru'];
  public destroyRef = inject(DestroyRef);

  constructor() {
    this.translateService.addLangs(this.languages);
    const browserLang = this.translateService.getBrowserLang();
    if (browserLang) this.translateService.use(browserLang);

    this.translateService.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.currentLang.set(event.lang));
  }

  public switchLang(lang: string): void {
    this.translateService.use(lang);
    this.currentLang.set(lang);
  }

  public getCurrentLang(): void {
    this.translateService.getCurrentLang();
  }
}

import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { LanguageService } from './language-service';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const onLangChangeSpy = jasmine.createSpyObj('onLangChange', ['pipe']);
    onLangChangeSpy.pipe.and.returnValue({
      subscribe: (callback: any) => {
        return { unsubscribe: () => {} };
      },
    });

    const translateSpy = jasmine.createSpyObj(
      'TranslateService',
      ['addLangs', 'getBrowserLang', 'use', 'getCurrentLang', 'setDefaultLang'],
      {
        onLangChange: onLangChangeSpy,
      },
    );

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        LanguageService,
        { provide: TranslateService, useValue: translateSpy },
        TranslateStore,
      ],
    });

    service = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;

    translateService.getBrowserLang.and.returnValue('en');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default language', () => {
    expect(service.currentLang()).toBe('en');
    expect(translateService.getBrowserLang).toHaveBeenCalled();
  });

  it('should add languages on init', () => {
    expect(translateService.addLangs).toHaveBeenCalledWith(['en', 'be', 'ru']);
  });

  it('should switch language', () => {
    const newLang = 'be';
    service.switchLang(newLang);

    expect(translateService.use).toHaveBeenCalledWith(newLang);
    expect(service.currentLang()).toBe(newLang);
  });

  it('should get current language', () => {
    service.getCurrentLang();
    expect(translateService.getCurrentLang).toHaveBeenCalled();
  });

  it('should update currentLang signal on language change', (done) => {
    const newLang = 'ru';
    translateService.onLangChange.pipe().subscribe((event: any) => {
      expect(service.currentLang()).toBe(newLang);
      done();
    });

    service.switchLang(newLang);
  });
});

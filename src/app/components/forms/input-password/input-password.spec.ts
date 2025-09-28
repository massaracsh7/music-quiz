import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputPassword } from './input-password';
import { of } from 'rxjs';

describe('InputPassword', () => {
  let component: InputPassword;
  let fixture: ComponentFixture<InputPassword>;

  const mockTranslateService = {
    instant: (key: string) => key,
    get: (key: string) => of(key),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPassword, ReactiveFormsModule, TranslateModule.forRoot()],
      providers: [{ provide: TranslateService, useValue: mockTranslateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(InputPassword);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

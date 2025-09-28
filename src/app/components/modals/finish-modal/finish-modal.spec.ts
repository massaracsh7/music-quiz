import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { FinishModal } from './finish-modal';

describe('FinishModal', () => {
  let component: FinishModal;
  let fixture: ComponentFixture<FinishModal>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['get', 'instant', 'use']);
    translateServiceSpy.get.and.returnValue(of(''));
    translateServiceSpy.instant.and.returnValue('');

    await TestBed.configureTestingModule({
      imports: [FinishModal],
      providers: [{ provide: TranslateService, useValue: translateServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FinishModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

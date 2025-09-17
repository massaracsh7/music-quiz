import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishModal } from './finish-modal';

describe('FinishModal', () => {
  let component: FinishModal;
  let fixture: ComponentFixture<FinishModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishModal],
    }).compileComponents();

    fixture = TestBed.createComponent(FinishModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

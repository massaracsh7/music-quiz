import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultModal } from './result-modal';

describe('ResultModal', () => {
  let component: ResultModal;
  let fixture: ComponentFixture<ResultModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

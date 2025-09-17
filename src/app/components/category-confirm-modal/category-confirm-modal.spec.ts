import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryConfirmModal } from './category-confirm-modal';

describe('CategoryConfirmModal', () => {
  let component: CategoryConfirmModal;
  let fixture: ComponentFixture<CategoryConfirmModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryConfirmModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryConfirmModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

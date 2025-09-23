import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryConfirmDeleteModal } from './category-confirm-delete-modal';

describe('CategoryConfirmDeleteModal', () => {
  let component: CategoryConfirmDeleteModal;
  let fixture: ComponentFixture<CategoryConfirmDeleteModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryConfirmDeleteModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryConfirmDeleteModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

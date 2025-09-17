import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryPage } from './create-category-page';

describe('CreateCategoryPage', () => {
  let component: CreateCategoryPage;
  let fixture: ComponentFixture<CreateCategoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategoryPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

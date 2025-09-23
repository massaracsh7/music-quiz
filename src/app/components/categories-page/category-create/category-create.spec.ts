import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCreate } from './category-create';

describe('CategoryCreate', () => {
  let component: CategoryCreate;
  let fixture: ComponentFixture<CategoryCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

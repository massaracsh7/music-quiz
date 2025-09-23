import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySearch } from './category-search';

describe('CategorySearch', () => {
  let component: CategorySearch;
  let fixture: ComponentFixture<CategorySearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

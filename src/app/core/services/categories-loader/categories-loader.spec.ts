import { TestBed } from '@angular/core/testing';

import { CategoriesLoader } from './categories-loader';

describe('CategoriesLoader', () => {
  let service: CategoriesLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ItunesService } from './itunes-service';

describe('ItunesService', () => {
  let service: ItunesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItunesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

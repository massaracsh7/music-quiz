import { TestBed } from '@angular/core/testing';

import { TracksLoader } from './tracks-loader';

describe('TracksLoader', () => {
  let service: TracksLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TracksLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

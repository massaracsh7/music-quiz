import { TestBed } from '@angular/core/testing';

import { Wavesurfer } from './wavesurfer';

describe('Wavesurfer', () => {
  let service: Wavesurfer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wavesurfer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

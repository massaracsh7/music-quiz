import { TestBed } from '@angular/core/testing';

import { ScoreCounter } from './score-counter';

describe('ScoreCounter', () => {
  let service: ScoreCounter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreCounter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

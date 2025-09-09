import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameField } from './game-field';

describe('GameField', () => {
  let component: GameField;
  let fixture: ComponentFixture<GameField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

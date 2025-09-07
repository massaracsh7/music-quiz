import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPassword } from './input-password';

describe('InputPassword', () => {
  let component: InputPassword;
  let fixture: ComponentFixture<InputPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

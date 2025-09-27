import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangSwitcher } from './lang-switcher';

describe('LangSwitcher', () => {
  let component: LangSwitcher;
  let fixture: ComponentFixture<LangSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangSwitcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LangSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

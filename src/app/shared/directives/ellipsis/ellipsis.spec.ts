import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Ellipsis } from './ellipsis';
import { By } from '@angular/platform-browser';

@Component({
  template: '<div appEllipsis>Test content that should be truncated</div>',
})
class TestComponent {}

describe('Ellipsis', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, Ellipsis],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directiveEl = fixture.debugElement.query(By.directive(Ellipsis));
    expect(directiveEl).toBeTruthy();
  });

  it('should apply ellipsis styles to the element', () => {
    const div = fixture.debugElement.query(By.css('div')).nativeElement;
    expect(div.style.overflow).toBe('hidden');
    expect(div.style.whiteSpace).toBe('nowrap');
    expect(div.style.textOverflow).toBe('ellipsis');
  });
});

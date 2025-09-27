import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ResultColor } from './result-color';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div appResultColor [isCorrect]="isCorrect">Text Element</div>
    <img appResultColor [isCorrect]="isCorrect" alt="Test Image" />
  `,
  standalone: true,
  imports: [ResultColor],
})
class TestComponent {
  isCorrect = false;
}

describe('ResultColor', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let divElement: HTMLElement;
  let imgElement: HTMLImageElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, ResultColor],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    divElement = fixture.debugElement.query(By.css('div')).nativeElement;
    imgElement = fixture.debugElement.query(By.css('img')).nativeElement;

    fixture.detectChanges();
  });

  it('should create instances on both div and img elements', () => {
    const directives = fixture.debugElement.queryAll(By.directive(ResultColor));
    expect(directives.length).toBe(2);
  });

  describe('when isCorrect is false', () => {
    beforeEach(() => {
      component.isCorrect = false;
      fixture.detectChanges();
    });

    it('should apply text-danger class to div elements', () => {
      expect(divElement.classList.contains('text-danger')).toBeTrue();
      expect(divElement.classList.contains('text-success')).toBeFalse();
    });

    it('should apply border-danger class to img elements', () => {
      expect(imgElement.classList.contains('border-danger')).toBeTrue();
      expect(imgElement.classList.contains('border-success')).toBeFalse();
    });
  });

  describe('when isCorrect is true', () => {
    beforeEach(() => {
      component.isCorrect = true;
      fixture.detectChanges();
    });

    it('should apply text-success class to div elements', () => {
      expect(divElement.classList.contains('text-success')).toBeTrue();
      expect(divElement.classList.contains('text-danger')).toBeFalse();
    });

    it('should apply border-success class to img elements', () => {
      expect(imgElement.classList.contains('border-success')).toBeTrue();
      expect(imgElement.classList.contains('border-danger')).toBeFalse();
    });
  });

  it('should update classes when isCorrect changes', () => {
    expect(divElement.classList.contains('text-danger')).toBeTrue();
    expect(imgElement.classList.contains('border-danger')).toBeTrue();

    component.isCorrect = true;
    fixture.detectChanges();

    expect(divElement.classList.contains('text-success')).toBeTrue();
    expect(imgElement.classList.contains('border-success')).toBeTrue();
  });
});

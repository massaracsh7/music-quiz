import { Directive, effect, ElementRef, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appResultColor]',
  standalone: true
})
export class ResultColor {
  public isCorrect = input<boolean>(false);

@HostBinding('class.text-success') textSuccess = false;
  @HostBinding('class.text-danger') textDanger = false;
  @HostBinding('class.border-success') borderSuccess = false;
  @HostBinding('class.border-danger') borderDanger = false;

  constructor(private el: ElementRef<HTMLElement>) {
    effect(() => {
      const tag = this.el.nativeElement.tagName;

      if (tag === 'IMG') {
        this.borderSuccess = this.isCorrect();
        this.borderDanger = !this.isCorrect();
        this.textSuccess = false;
        this.textDanger = false;
      } else {
        this.textSuccess = this.isCorrect();
        this.textDanger = !this.isCorrect();
        this.borderSuccess = false;
        this.borderDanger = false;
      }
    });
  }
}
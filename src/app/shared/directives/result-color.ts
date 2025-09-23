import { Directive, effect, ElementRef, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appResultColor]',
  standalone: true,
})
export class ResultColor {
  @HostBinding('class.text-success') public textSuccess = false;
  @HostBinding('class.text-danger') public textDanger = false;
  @HostBinding('class.border-success') public borderSuccess = false;
  @HostBinding('class.border-danger') public borderDanger = false;

  public isCorrect = input<boolean>(false);

  constructor(public element: ElementRef<HTMLElement>) {
    effect(() => {
      const tag = this.element.nativeElement.tagName;

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

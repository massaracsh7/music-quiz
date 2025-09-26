import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEllipsis]'
})
export class Ellipsis {

  constructor(
    public element: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.addStylesToElement();
  }

  private addStylesToElement(): void {
    const element = this.element.nativeElement;

    this.renderer.setStyle(element, 'overflow', 'hidden');
    this.renderer.setStyle(element, 'white-space', 'nowrap');
    this.renderer.setStyle(element, 'text-overflow', 'ellipsis');
  }
}

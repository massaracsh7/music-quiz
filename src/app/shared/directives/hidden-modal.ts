import { Directive, effect, input } from '@angular/core';

@Directive({
  selector: '[appHiddenModal]'
})
export class HiddenModal {
  public showDialog = input<boolean>(false);
  constructor() {
    effect(() => {
      document.body.style.overflow = this.showDialog() ? 'hidden' : '';
    });
  }

}

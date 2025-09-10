import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { ToastService } from '../../services/toast/toast';
import { Toast as BsToast } from 'bootstrap';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  public toastService = inject(ToastService);

  public toastEl = viewChild<ElementRef<HTMLDivElement>>('toastEl');

  constructor() {
    effect(() => {
      const toastData = this.toastService.toast();
      if (toastData && this.toastEl()) {
        const bsToast = new BsToast(this.toastEl()?.nativeElement!, {
          animation: true,
          autohide: true,
          delay: 3000,
        });
        this.toastEl()!.nativeElement.addEventListener(
          'hidden.bs.toast',
          () => {
            this.toastService.clear();
          },
          { once: true },
        );
        bsToast.show();
      }
    });
  }
}

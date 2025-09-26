import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  viewChild,
  viewChildren,
} from '@angular/core';
import { ToastService } from '../../services/toast/toast';
import { Toast as BsToast } from 'bootstrap';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
})
export class Toast {
  public toastService = inject(ToastService);
  public toasts = this.toastService.toasts;
  public toastList = viewChildren<ElementRef<HTMLDivElement>>('toastEl');

  constructor() {
    effect(() => {
      const toastItem = this.toastList();
      for (const toast of this.toasts()) {
        const toastElement = toastItem.find(
          (item) => item.nativeElement.id === `toast-${toast.id}`,
        );
        if (toastElement) {
          const bsToast = new BsToast(toastElement.nativeElement, {
            animation: true,
            autohide: true,
            delay: 3000,
          });
          toastElement.nativeElement.addEventListener(
            'hidden.bs.toast',
            () => {
              this.toastService.remove(toast.id);
            },
            { once: true },
          );
          bsToast.show();
        }
      }
    });
  }
}

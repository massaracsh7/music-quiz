import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, viewChild, viewChildren } from '@angular/core';
import { ToastService } from '../../services/toast/toast';
import { Toast as BsToast } from 'bootstrap';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Toast {
  toastService = inject(ToastService);
  toasts = this.toastService.toasts;
  toastList = viewChildren<ElementRef<HTMLDivElement>>('toastEl');

  constructor() {
    effect(() => {
        const toastItem = this.toastList();
        this.toasts().forEach(toast => {
            const toastEl = toastItem.find(item => item.nativeElement.id === `toast-${toast.id}`);
            if (toastEl) {
              const bsToast = new BsToast(toastEl.nativeElement, { animation: true, autohide: true, delay: 3000 });
              toastEl.nativeElement.addEventListener('hidden.bs.toast', () => {
                this.toastService.remove(toast.id);
              }, { once: true });
              bsToast.show();
            }
          }
        );
      });
  
  }
}

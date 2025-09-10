import { Injectable, signal } from '@angular/core';

export interface ToastItem {
  message: string;
  type: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toast = signal<ToastItem | null>(null);

  show(message: string, type: 'success' | 'error' = 'error') {
    this.toast.set({ message, type });
  }

  clear() {
    this.toast.set(null);
  }
}

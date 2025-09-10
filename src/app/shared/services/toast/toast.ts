import { Injectable, signal } from '@angular/core';

export type ToastItem = {
  message: string;
  type: 'success' | 'error';
};

@Injectable({ providedIn: 'root' })
export class ToastService {
  public toast = signal<ToastItem | null>(null);

  public show(message: string, type: 'success' | 'error' = 'error'): void {
    this.toast.set({ message, type });
  }

  public clear(): void {
    this.toast.set(null);
  }
}

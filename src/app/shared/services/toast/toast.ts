import { Injectable, signal } from '@angular/core';

export type ToastItem = {
  id: number;
  message: string;
  type: 'success' | 'error';
};

@Injectable({ providedIn: 'root' })
export class ToastService {
  public nextId = 0;
  public toasts = signal<ToastItem[]>([]);

  public show(message: string, type: 'success' | 'error' = 'error'): void {
    const id = this.nextId++;
    const toast: ToastItem = { id, message, type };
    this.toasts.update((toasts) => [...toasts, toast]);
  }

  public remove(id: number): void {
    this.toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }

  public clear(): void {
    this.toasts.set([]);
  }
}

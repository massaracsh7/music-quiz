import { Component, effect, input, output } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-finish-modal',
  imports: [],
  templateUrl: './finish-modal.html',
  styleUrl: './finish-modal.scss',
})
export class FinishModal {
  public showFinishDialog = input<boolean>();
  public categories = input<Category[]>([]);
  public closeDialog = output<void>();
  public onCategorySelected = output<Category>();

  constructor() {
    effect(() => {
      document.body.style.overflow = this.showFinishDialog() ? 'hidden' : '';
    });
  }
}

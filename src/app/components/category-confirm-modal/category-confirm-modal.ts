import { Component, effect, input, output } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-confirm-modal',
  imports: [],
  templateUrl: './category-confirm-modal.html',
  styleUrl: './category-confirm-modal.scss',
})
export class CategoryConfirmModal {
  public category = input<Category>();
  public selectedCategory = input<Category | null>();
  public showCategoryDialog = input<boolean>(false);
  public onCategorySelectDialogClose = output<Category>();
  public closeCategoryDialog = output<void>();

  constructor() {
    effect(() => {
      document.body.style.overflow = this.showCategoryDialog() ? 'hidden' : '';
    });
  }
}

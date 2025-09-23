import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'app-category-confirm-delete-modal',
  imports: [],
  templateUrl: './category-confirm-delete-modal.html',
  styleUrl: './category-confirm-delete-modal.scss',
})
export class CategoryConfirmDeleteModal {
  public selectedCategory = input<string>('');
  public showCategoryDeleteDialog = input<boolean>(false);
  public onCategorySelectDelete = output<string>();
  public closeCategoryDialog = output<void>();

  constructor() {
    effect(() => {
      document.body.style.overflow = this.showCategoryDeleteDialog() ? 'hidden' : '';
    });
  }
}

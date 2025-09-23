import { Component, computed, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryConfirmDeleteModal } from '../modals/category-confirm-delete-modal/category-confirm-delete-modal';
import { CategoryService } from '../../core/services/сategory-service/сategory-service';
import { ToastService } from '../../shared/services/toast/toast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categories-page',
  imports: [RouterLink, CategoryConfirmDeleteModal],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.scss',
})
export class CategoriesPage {
  public toast = inject(ToastService);
  public destroyRef = inject(DestroyRef);
  public categoryService = inject(CategoryService);

  public showCategoryDeleteDialog = signal(false);
  public currentCategory: WritableSignal<string> = signal('');

  public categories = this.categoryService.categories;

  public categoriesWithArtwork = computed(() => {
    return this.categories().map((category) => {
      const artworkUrl = this.categoryService.getFirstTrackArtwork(category);
      return {
        ...category,
        artworkUrl,
      };
    });
  });

  public onCategorySelectDelete(id: string): void {
    this.showCategoryDeleteDialog.set(false);
    this.deleteCategory(id);
  }

  public categoryDelete(id: string): void {
    this.showCategoryDeleteDialog.set(true);
    this.currentCategory.set(id);
  }

  public closeCategoryDialog(): void {
    this.showCategoryDeleteDialog.set(false);
  }

  public deleteCategory(id: string): void {
    this.showCategoryDeleteDialog.set(false);
    this.categoryService
      .deleteCategory(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toast.show('Category deleted successfully', 'success');
        },
        error: () => {
          this.toast.show('Error deleting category', 'error');
        },
      });
    this.categoryService
      .deleteLeaderboardCategory(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}

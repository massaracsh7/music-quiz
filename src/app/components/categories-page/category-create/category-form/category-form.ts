import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchStateService } from '../../../../core/services/search-state-service/search-state-service';
import { CategoryService } from '../../../../core/services/сategory-service/сategory-service';
import { Category } from '../../../../models/category.model';
import { ITunesTrack } from '../../../../models/itunes.model';
import { LeaderboardCategory } from '../../../../models/leaderboard.model';
import { slugHelpers } from '../../../../shared/helpers/slug-helpers';
import { ToastService } from '../../../../shared/services/toast/toast';
import { Ellipsis } from '../../../../shared/directives/ellipsis/ellipsis';
import { CategorySearch } from '../category-search/category-search';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, Ellipsis, TranslatePipe],
  providers: [CategorySearch],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss',
})
export class CategoryForm {
  public searchState = inject(SearchStateService);
  public toast = inject(ToastService);

  public categoryForm = new FormGroup({
    categoryName: new FormControl(''),
  });

  public categoryName = signal<string>('');
  public selectedTracks = this.searchState.selectedTracks;

  public translate = inject(TranslateService);
  private categoryService = inject(CategoryService);
  private destroyRef = inject(DestroyRef);
  private search = inject(CategorySearch);
  private router = inject(Router);

  public createCategory(): void {
    const categoryValue = this.categoryForm.get('categoryName')!.value!;
    if (!categoryValue) return;

    const slugCategoryValue = slugHelpers(categoryValue, 50);
    this.categoryName.set(slugCategoryValue);

    const category: Category = {
      id: slugCategoryValue,
      title: categoryValue,
      tracks: this.selectedTracks().map((track) => track.trackId),
    };

    const categoryForLeaderboard: LeaderboardCategory = {
      id: slugCategoryValue,
      title: categoryValue,
    };

    this.categoryService
      .createCategory(category)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toast.show(
            this.translate.instant('TOAST.CATEGORY_CREATED', { title: category.title }),
            'success',
          );
          this.categoryForm.reset();
          this.searchState.clearSelectedTracks();
          void this.router.navigate(['/categories']);
        },
        error: (error) => {
          this.toast.show(this.translate.instant('TOAST.CATEGORY_CREATE_FAILED'), 'error');
          console.error('Error creating category', error);
          void this.router.navigate(['/categories']);
        },
      });
    this.search.clearSearch();

    this.categoryService.addLeaderboardCategory(categoryForLeaderboard);
  }

  public onTrackSelect(track: ITunesTrack): void {
    this.searchState.removeFromSelectedTracks(track.trackId);

    const tracks = this.searchState.tracks();
    const updatedTracks = tracks.map((tr) =>
      tr.trackId === track.trackId ? { ...tr, isSelected: false } : tr,
    );
    this.searchState.tracks.set(updatedTracks);
  }

  public getSelectedCount(): number {
    return this.selectedTracks().length;
  }

  public canCreateCategory(): boolean {
    return this.selectedTracks().length >= 8 && !!this.categoryForm.get('categoryName')?.value;
  }
}

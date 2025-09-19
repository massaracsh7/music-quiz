import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../../models/category.model';
import { SearchStateService } from '../../../core/services/search-state-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SlugPipe } from '../../../shared/pipes/slug-pipe';
import { Search } from '../search/search';
import { LineLimiterPipe } from '../../../shared/pipes/line-limiter-pipe';
import { ITunesTrack } from '../../../models/i-tunes.model';
import { LeaderboardCategory } from '../../../models/leaderboard.model';
import { CategoryService } from '../../../core/services/сategory-service/сategory-service';
import { ToastService } from '../../../shared/services/toast/toast';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, LineLimiterPipe],
  providers: [SlugPipe, Search],
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

  private categoryService = inject(CategoryService);
  private slugPipe = inject(SlugPipe);
  private destroyRef = inject(DestroyRef);
  private search = inject(Search);

  public createCategory(): void {
    const categoryValue = this.categoryForm.get('categoryName')!.value!;
    if (!categoryValue) return;

    const slugCategoryValue = this.slugPipe.transform(categoryValue, 50);
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
          this.toast.show(`Category "${category.title}" has been successfully created`, 'success');
          this.categoryForm.reset();
          this.searchState.clearSelectedTracks();
        },
        error: (error) => {
          this.toast.show('An error occurred when creating the category', 'error');
          console.error('Error creating category', error);
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

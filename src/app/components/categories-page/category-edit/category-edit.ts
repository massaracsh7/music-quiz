import {
  AfterViewInit,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SearchService } from '../../../core/services/search-service';
import { CategoryService } from '../../../core/services/сategory-service/сategory-service';
import { Category } from '../../../models/category.model';
import { ITunesTrack } from '../../../models/itunes.model';
import { ToastService } from '../../../shared/services/toast/toast';
import { Ellipsis } from '../../../shared/directives/ellipsis/ellipsis';
import { CategoryConfirmDeleteModal } from '../../modals/category-confirm-delete-modal/category-confirm-delete-modal';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category-edit',
  imports: [
    Ellipsis,
    FormsModule,
    RouterLink,
    CategoryConfirmDeleteModal,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.scss',
})
export class CategoryEdit {
  public searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  public translate = inject(TranslateService);

  public category = signal<Category | null>(null);
  public loading = signal(true);
  public saving = signal(false);

  public searchQuery = signal('');
  public searchResults = signal<ITunesTrack[]>([]);
  public searchLoading = signal(false);
  public isSearching = signal<boolean>(false);
  public categoryTracks = signal<ITunesTrack[]>([]);

  public showCategoryDeleteDialog = signal(false);
  public currentCategory: WritableSignal<string> = signal('');

  public categoryForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  private searchService = inject(SearchService);
  private toast = inject(ToastService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.loadCategory(categoryId);
    }

    effect(() => {
      const element = this.searchInput();
      if (element) element.nativeElement.focus();
    });
  }

  public loadCategory(id: string): void {
    this.loading.set(true);
    this.categoryService
      .getCategoryById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (category) => {
          if (category) {
            this.category.set(category);
            this.categoryForm.patchValue({
              title: category.title,
            });
            this.loadCategoryTracks(category.tracks || []);
          }
          this.loading.set(false);
        },
        error: () => {
          this.toast.show(this.translate.instant('TOAST.CATEGORY_LOAD_ERROR'), 'error');
          this.loading.set(false);
        },
      });
  }

  public loadCategoryTracks(trackIds: number[]): void {
    if (trackIds.length === 0) {
      this.categoryTracks.set([]);
      this.loading.set(false);
      return;
    }

    this.categoryService
      .getTracksByIds(trackIds)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (tracks) => {
          this.categoryTracks.set(tracks);
          this.loading.set(false);
        },
        error: () => {
          this.toast.show(this.translate.instant('TOAST.TRACKS_LOAD_ERROR'), 'error');
        },
      });
  }

  public onSearch(): void {
    const query = this.searchQuery().trim();
    if (query.length < 2) return;
    this.isSearching.set(true);

    this.searchLoading.set(true);
    this.searchResults.set([]);

    this.searchService
      .searchTracks(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (tracks) => {
          this.searchResults.set(tracks);
          this.searchLoading.set(false);
        },
        error: (error) => {
          this.searchLoading.set(false);
          this.searchResults.set([]);
          this.toast.show(this.translate.instant('TOAST.ITUNES_SEARCH_ERROR'), 'error');
          console.error('Search error:', error);
        },
      });
  }

  public clearSearch(): void {
    this.searchQuery.set('');
    this.searchResults.set([]);
    this.isSearching.set(false);
  }

  public isTrackInCategory(trackId: number): boolean {
    return this.categoryTracks().some((track) => track.trackId === trackId);
  }

  public addTrackToCategory(track: ITunesTrack): void {
    const currentTracks = this.categoryTracks();
    this.categoryTracks.set([...currentTracks, track]);
  }

  public removeTrackFromCategory(trackId: number): void {
    const currentTracks = this.categoryTracks();
    this.categoryTracks.set(currentTracks.filter((track) => track.trackId !== trackId));
  }

  public updateCategory(): void {
    if (this.categoryForm.valid && this.category() && this.categoryForm.value.title) {
      this.saving.set(true);

      this.categoryService
        .updateCategory({
          ...this.category()!,
          title: this.categoryForm.value.title,
          tracks: this.categoryTracks().map((track) => track.trackId),
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.toast.show(this.translate.instant('TOAST.CATEGORY_UPDATED'), 'success');
            this.saving.set(false);
            void this.router.navigate(['/categories']);
          },
          error: () => {
            this.toast.show(this.translate.instant('TOAST.CATEGORY_UPDATE_FAILED'), 'error');
            this.saving.set(false);
          },
        });
      this.categoryService
        .updateLeaderboardCategory({
          ...this.category()!,
          title: this.categoryForm.value.title,
          tracks: this.categoryTracks().map((track) => track.trackId),
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }
  }

  public deleteCategory(): void {
    this.saving.set(true);

    this.categoryService
      .deleteCategory(this.category()!.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toast.show(this.translate.instant('TOAST.CATEGORY_DELETED'), 'success');
          void this.router.navigate(['/categories']);
        },
        error: () => {
          this.toast.show(this.translate.instant('TOAST.CATEGORY_DELETE_FAILED'), 'error');
          this.saving.set(false);
        },
      });
    this.categoryService
      .deleteLeaderboardCategory(this.category()!.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  public onCategorySelectDelete(id: string): void {
    this.showCategoryDeleteDialog.set(false);
    this.deleteCategory();
  }

  public categoryDelete(): void {
    this.showCategoryDeleteDialog.set(true);
    this.currentCategory.set(this.category()!.id);
  }

  public closeCategoryDialog(): void {
    this.showCategoryDeleteDialog.set(false);
  }
}

import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../../../core/services/search-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, switchMap } from 'rxjs';
import { SearchStateService } from '../../../../core/services/search-state-service';
import { ITunesTrack } from '../../../../models/i-tunes.model';
import { FormsModule } from '@angular/forms';
import { Ellipsis } from '../../../../shared/directives/ellipsis/ellipsis';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-category-search',
  imports: [FormsModule, Ellipsis, TranslatePipe],
  templateUrl: './category-search.html',
  styleUrl: './category-search.scss',
})
export class CategorySearch implements OnInit, OnDestroy {
  public searchState = inject(SearchStateService);

  public tracks = this.searchState.tracks;
  public selectedTracks = this.searchState.selectedTracks;
  public isLoading = this.searchState.isLoading;
  public isSearching = this.searchState.isSearching;
  public searchQuery = this.searchState.searchQuery;

  private searchService = inject(SearchService);
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  private destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.setupSearch();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSearchInput(): void {
    this.isSearching.set(true);
    if (this.searchQuery().trim().length >= 2) {
      this.searchSubject.next(this.searchQuery().trim());
    } else {
      this.tracks.set([]);
    }
  }

  public onTrackSelect(track: ITunesTrack): void {
    const currentSelectedTracks = this.selectedTracks();

    if (track.isSelected) {
      const updatedSelectedTracks = currentSelectedTracks.filter(
        (song) => song.trackId !== track.trackId,
      );
      this.selectedTracks.set(updatedSelectedTracks);
    } else {
      const updatedSelectedTracks = [...currentSelectedTracks, { ...track, isSelected: true }];
      this.selectedTracks.set(updatedSelectedTracks);
    }

    const updateTracks = this.tracks().map((song) =>
      song.trackId === track.trackId ? { ...song, isSelected: !song.isSelected } : song,
    );

    this.tracks.set(updateTracks);
  }

  public clearSearch(): void {
    this.searchQuery.set('');
    this.tracks.set([]);
    this.isSearching.set(false);
  }

  private setupSearch(): void {
    this.isSearching.set(false);
    this.searchSubject
      .pipe(
        switchMap((query) => {
          this.isLoading.set(true);
          return this.searchService.searchTracks(query);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (search) => {
          const filteredTracks = this.searchService.filterOnlyTracks(search);
          const updatedTracks = this.updateSelectedFlags(filteredTracks, this.selectedTracks());

          this.tracks.set(updatedTracks);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('An unexpected error occurred', error);
          this.isLoading.set(false);
          this.tracks.set([]);
        },
      });
  }

  private updateSelectedFlags(
    searchResults: ITunesTrack[],
    selectedTracks: ITunesTrack[],
  ): ITunesTrack[] {
    const selectedTrackIds = new Set(selectedTracks.map((track) => track.trackId));
    return searchResults.map((track) => ({
      ...track,
      isSelected: selectedTrackIds.has(track.trackId),
    }));
  }
}

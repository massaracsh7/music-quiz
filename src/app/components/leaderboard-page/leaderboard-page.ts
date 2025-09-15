import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LeaderboardService } from '../../core/services/leaderboard-service';
import { LeaderboardUser } from '../../models/leaderboard.model';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-leaderboard-page',
  standalone: true,
  imports: [],
  providers: [LeaderboardService],
  templateUrl: './leaderboard-page.html',
  styleUrl: './leaderboard-page.scss',
})
export class LeaderboardPage implements OnInit {
  public leaderboardService = inject(LeaderboardService);

  public categories = this.leaderboardService.leaderboards;
  public sortField = signal<string>('score');
  public sortDirection = signal<'asc' | 'desc'>('asc');

  public maxScore = 240;
  public isLoading: boolean = false;

  public selectedCategoryId = signal<string>('');
  public selectedCategoryTitle = signal<string>('');

  public firstCategory = computed(() =>
    this.categories().length > 0 ? this.categories()[0] : null
  );
  public firstCategoryId = computed(() =>
    this.firstCategory()?.id || ''
  );
  public firstCategoryTitle = computed(() =>
    this.firstCategory()?.title || ''
  );

  public currentCategoryId = computed(() =>
    this.selectedCategoryId() || this.firstCategoryId()
  );
  public currentCategoryTitle = computed(() =>
    this.selectedCategoryTitle() || this.firstCategoryTitle()
  );

  public leaderboard = toSignal(
    toObservable(this.selectedCategoryId).pipe(
      takeUntilDestroyed(),
      switchMap((categoryId) => {
        return categoryId || this.firstCategoryId()
          ? this.leaderboardService.getUsersForCategory(categoryId || this.firstCategoryId())
          : []
      })
    ),
    { initialValue: [] as LeaderboardUser[] }
  );


  public filteredLeaderboard = computed(() => {
    return this.sortData([...this.leaderboard()], this.sortField(), this.sortDirection());
  });

  public statistics = computed(() => {
    const totalPlayers = this.leaderboard().length;
    const currentData = this.filteredLeaderboard();

    const currentAverage =
      currentData.length > 0
        ? Math.round(
          currentData.reduce((sum, entry) => sum + Number(entry.score), 0) / currentData.length
        )
        : 0;

    const successRate =
      currentData.length > 0 ? 100 - Math.round(100 / (this.maxScore / currentAverage)) : 0;

    return {
      totalPlayers,
      currentDataCount: currentData.length,
      currentAverage,
      successRate,
    };
  });

  public ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      if (this.categories().length > 0) {
        this.selectedCategoryId.set(this.categories()[0].id);
        this.selectedCategoryTitle.set(this.categories()[0].title);
      }
      this.isLoading = false;
    },500)
  }

  public changeFilterCategory(categoryId: string, categoryTitle: string): void {
    this.selectedCategoryId.set(categoryId);
    this.selectedCategoryTitle.set(categoryTitle)
  }

  public toggleSort(field: string): void {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'desc' ? 'asc' : 'desc');
    } else {
      this.sortField.set(field);
      this.sortDirection.set('desc');
    }
  }

  public sortData(
    data: LeaderboardUser[],
    field: string,
    direction: 'desc' | 'asc',
  ): LeaderboardUser[] {
    return [...data].sort((a, b) => {
      let firstValue: string | number;
      let secondValue: string | number;

      switch (field) {
        case 'email': {
          firstValue = a.email.toLowerCase();
          secondValue = b.email.toLowerCase();
          break;
        }
        default: {
          firstValue = a.score;
          secondValue = b.score;
        }
      }

      if (direction === 'desc') {
        return secondValue > firstValue ? 1 : (secondValue < firstValue ? -1 : 0);
      } else {
        return firstValue > secondValue ? 1 : (firstValue < secondValue ? -1 : 0);
      }
    });
  }
}

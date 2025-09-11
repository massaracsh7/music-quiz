import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LeaderboardService } from '../../core/services/leaderboard-service';
import { LeaderboardUser } from '../../models/leaderboard.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-leaderboard-page',
  imports: [],
  templateUrl: './leaderboard-page.html',
  styleUrl: './leaderboard-page.scss',
})
export class LeaderboardPage implements OnInit {
  public leaderboardService = inject(LeaderboardService);

  public leaderboard = signal<LeaderboardUser[]>([]);
  public categories = this.leaderboardService.leaderboards;
  public currentCategory = signal<string>(this.categories().map((data) => data.title)[0]);
  public currentFilter = signal<string>(this.categories().map((data) => data.title)[0]);
  public sortField = signal<string>('score');
  public sortDirection = signal<'asc' | 'desc'>('asc');

  public maxScore = 240;

  public filteredLeaderboard = computed(() => {
    let filtered: LeaderboardUser[];

    this.currentFilter() === 'all'
      ? (filtered = [...this.leaderboard()])
      : (filtered = [...this.leaderboard()]);

    return this.sortData(filtered, this.sortField(), this.sortDirection());
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
    this.loadLeaderboard();
  }

  public loadLeaderboard(): void {
    this.leaderboardService
      .getUsersForCategory(this.categories().map((data) => data.title)[0])
      .pipe(map((data) => data))
      .subscribe((users) => {
        this.leaderboard.set(users);
      });
  }

  public changeFilterCategory(categoryId: string, categoryName: string): void {
    this.currentCategory.set(categoryName);
    this.leaderboardService
      .getUsersForCategory(categoryId)
      .pipe(map((data) => data))
      .subscribe((users) => {
        this.leaderboard.set(users);
        this.currentFilter.set(categoryId);
      });
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

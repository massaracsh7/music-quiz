import { Component, computed, OnInit, signal } from '@angular/core';
import {
  getLeaderboard,
  getScoresByCategory,
  LeaderboardEntry,
  MOCK_LEADERBOARD
} from '../../shared/data/leaderboard-data';
import { MUSIC_CATEGORIES } from '../../shared/utils/music-categories';

@Component({
  selector: 'app-leaderboard-page',
  imports: [],
  templateUrl: './leaderboard-page.html',
  styleUrl: './leaderboard-page.scss'
})
export class LeaderboardPage implements OnInit{
  public leaderboard = signal<LeaderboardEntry[]>([]);
  public currentFilter = signal<string>('all');
  public sortField = signal<string>('score');
  public sortDirection = signal<'asc' | 'desc'>('asc');

  public maxScore = 240;

  public categories = [
    { id: 'all', name: 'All' },
    ...MUSIC_CATEGORIES.map((category) => ({
      id: category.name,
      name: category.name,
    })),
  ];

  public filteredLeaderboard = computed(() => {
    const filtered =
      this.currentFilter() === 'all'
        ? [...this.leaderboard()]
        : getScoresByCategory(this.currentFilter());

    return this.sortData(filtered, this.sortField(), this.sortDirection());
  });

  public statistics = computed(() => {
    const totalPlayers = MOCK_LEADERBOARD.length;
    const currentData = this.filteredLeaderboard();

    const currentAverage =
      currentData.length > 0
        ? Math.round(currentData.reduce((sum, entry) => sum + entry.score, 0) / currentData.length)
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
    this.leaderboard.set(getLeaderboard());
  }

  public changeFilterCategory(category: string): void {
    this.currentFilter.set(category);
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
    data: LeaderboardEntry[],
    field: string,
    direction: 'desc' | 'asc',
  ): LeaderboardEntry[] {
    return [...data].sort((a, b) => {
      let firstValue: string | number;
      let secondValue: string | number;

      switch (field) {
        case 'username': {
          firstValue = a.username.toLowerCase();
          secondValue = b.username.toLowerCase();
          break;
        }
        case 'category': {
          firstValue = a.category.toLowerCase();
          secondValue = b.category.toLowerCase();
          break;
        }
        default: {
          firstValue = a.score;
          secondValue = b.score;
        }
      }

      if (field === 'score') {
        if (direction === 'desc') {
          return secondValue > firstValue ? 1 : (secondValue < firstValue ? -1 : 0);
        } else {
          return firstValue > secondValue ? 1 : (firstValue < secondValue ? -1 : 0);
        }
      } else {
        if (direction === 'desc') {
          return secondValue > firstValue ? 1 : (secondValue < firstValue ? -1 : 0);
        } else {
          return firstValue > secondValue ? 1 : (firstValue < secondValue ? -1 : 0);
        }
      }
    });
  }
}

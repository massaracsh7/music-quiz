import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScoreCounter {
  public score = signal(0);

  public increaseScore(scoreCount: number): void {
    this.score.update((previous) => previous + scoreCount);
  }

  public resetScore(): void {
    this.score.set(0);
  }
}

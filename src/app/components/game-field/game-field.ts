import {
  Component,
  effect,
  inject,
  signal,
  WritableSignal,
  computed,
  ChangeDetectionStrategy,
  DestroyRef,
  input,
} from '@angular/core';
import { Wavesurfer } from '../../core/services/wavesurfer/wavesurfer';
import { CategoryService } from '../../core/services/сategory-service/сategory-service';
import { Category } from '../../models/category.model';
import { TracksLoader } from '../../core/services/tracks-loader/tracks-loader';
import { Track } from '../../models/types/track.type';
import { ResultModal } from '../modals/result-modal/result-modal';
import { ScoreCounter } from '../../core/services/score-counter/score-counter';
import { FinishModal } from '../modals/finish-modal/finish-modal';
import { CategoryConfirmModal } from '../modals/category-confirm-modal/category-confirm-modal';
import { LeaderboardService } from '../../core/services/leaderboard-service';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-game-page-field',
  imports: [ResultModal, FinishModal, CategoryConfirmModal],
  templateUrl: './game-field.html',
  styleUrl: './game-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameField {
  public categoryId = input<string | null>(null);

  public categoriesLoader: CategoryService = inject(CategoryService);
  public tracksLoader: TracksLoader = inject(TracksLoader);
  public wavesurfer: Wavesurfer = inject(Wavesurfer);
  public scoreCounter: ScoreCounter = inject(ScoreCounter);
  public leaderboardService: LeaderboardService = inject(LeaderboardService);
  public authService: AuthService = inject(AuthService);

  public showResultDialog = signal(false);
  public showFinishDialog = signal(false);
  public showCategoryDialog = signal(false);
  public categories = this.categoriesLoader.categories;
  public currentCategory: WritableSignal<Category | null> = signal(null);
  public selectedCategory: WritableSignal<Category | null> = signal(null);
  public currentTracks = signal<Track[]>([]);
  public currentTrackIndex = signal(0);
  public isCorrect = signal(false);
  public isPlaying = computed(() => this.wavesurfer.isPlaying());
  public isFinished = computed(() => this.wavesurfer.isFinished());
  public isBeforeFirstRound = signal(true);
  public trackNames = computed(() => {
    const currentTrack = this.currentTrack();
    const tracks = this.currentTracks();
    const trackNames = tracks.map((track) => track.trackName);
    const randomNames = [];
    if (currentTrack?.trackName) randomNames.push(currentTrack?.trackName);
    for (let index = 0; index < 3; index += 1) {
      trackNames[index] === currentTrack?.trackName
        ? randomNames.push(trackNames.at(-1))
        : randomNames.push(trackNames[index]);
    }
    return randomNames
      .sort(() => 0.5 - Math.random())
      .map((name, index) => ({
        id: index,
        name: name,
      }));
  });
  public trackResults = signal<Array<boolean | null>>([]);

  public currentTrack = computed(() => {
    const tracks = this.currentTracks();
    const index = this.currentTrackIndex();
    return tracks.length > 0 && index < tracks.length ? tracks[index] : undefined;
  });

  private destroyed = signal(false);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const categories = this.categories();
      if (this.categoryId()) {
        const category = categories.find((c) => c.id === this.categoryId());
        if (category) {
          this.currentCategory.set(category);
          return;
        }
      }

      if (categories.length > 0 && !this.currentCategory()) {
        this.currentCategory.set(categories[0]);
      }
    });

    effect(() => {
      const category = this.currentCategory();
      if (category) {
        this.tracksLoader.getTracksByIds(category.tracks).subscribe((tracks) => {
          this.currentTracks.set(tracks);
          this.currentTrackIndex.set(0);
          this.trackResults.set(Array.from<boolean | null>({ length: tracks.length }).fill(null));
          this.initCurrentTrack(false);
        });
      }
    });

    effect(() => {
      return (): void => {
        if (this.wavesurfer) {
          this.wavesurfer.destroy();
        }
        this.destroyed.set(true);
      };
    });

    effect(() => {
      const finished = this.isFinished();
      if (finished) {
        this.onFalseAnswer();
        this.showResult();
        this.scoreCounter.increaseScore(30);
        this.wavesurfer.isFinished.set(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      this.wavesurfer.destroy();
    });
  }

  public onCategorySelected(category: Category): void {
    this.showCategoryDialog.set(true);
    this.selectedCategory.set(category);
  }

  public onCategorySelectDialogClose(category: Category): void {
    this.showCategoryDialog.set(false);
    if (category) {
      this.currentCategory.set(structuredClone(category));
      this.wavesurfer.stop();
      this.scoreCounter.resetScore();
    }
  }

  public onDontKnowClick(): void {
    const currentTrack = this.currentTrack();
    if (!currentTrack) return;

    this.onFalseAnswer();
    const isCorrect = false;
    const results = [...this.trackResults()];
    results[this.currentTrackIndex()] = isCorrect;
    this.trackResults.set(results);

    this.showResult();
    this.scoreCounter.increaseScore(30);

    this.onDialogPlay();
  }

  public onFalseAnswer(): void {
    const results = [...this.trackResults()];
    results[this.currentTrackIndex()] = false;
    this.trackResults.set(results);
  }

  public onDialogPlay(): void {
    if (this.wavesurfer) {
      this.wavesurfer.stop();
      this.wavesurfer.play();
      setTimeout(() => {
        this.wavesurfer.stop();
      }, 20_000);
    }
  }

  public onAnswerSelected(answer: string): void {
    const currentTrack = this.currentTrack();
    if (!currentTrack) return;

    const isCorrect = answer === currentTrack.trackName;
    this.isCorrect.set(isCorrect);

    const results = [...this.trackResults()];
    results[this.currentTrackIndex()] = isCorrect;
    this.trackResults.set(results);

    this.showResult();

    isCorrect
      ? this.scoreCounter.increaseScore(this.wavesurfer.currentTime())
      : this.scoreCounter.increaseScore(30);

    this.onDialogPlay();
  }

  public closeDialog(): void {
    this.showResultDialog.set(false);
    this.wavesurfer.stop();

    this.currentTrackIndex() < this.currentTracks().length - 1
      ? this.nextTrack()
      : this.showFinishDialog.set(true);
  }

  public closeFinishDialog(): void {
    this.showFinishDialog.set(false);
    const category = this.currentCategory();
    const currentUser = this.authService.currentUser();
    if (category?.id && currentUser?.email) {
      this.leaderboardService.setUserScore(
        category.id,
        currentUser.email,
        this.scoreCounter.score(),
      );
    }
    this.scoreCounter.resetScore();
  }

  public closeCategoryDialog(): void {
    this.showCategoryDialog.set(false);
  }

  public onPlay(): void {
    this.wavesurfer.play();
    this.isBeforeFirstRound.set(false);
  }

  private showResult(): void {
    this.showResultDialog.set(true);
  }

  private initCurrentTrack(autoPlay: boolean): void {
    const track = this.currentTrack();
    if (!track) return;
    this.wavesurfer.isFinished.set(false);
    this.wavesurfer.init('#waveform', track.previewUrl, autoPlay);
  }

  private nextTrack(): void {
    const nextIndex = this.currentTrackIndex() + 1;
    if (nextIndex < this.currentTracks().length) {
      this.currentTrackIndex.set(nextIndex);
      this.initCurrentTrack(true);
    }
  }
}

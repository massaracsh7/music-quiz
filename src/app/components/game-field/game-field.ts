import { Component, effect, inject, signal, WritableSignal, computed } from '@angular/core';
import { Wavesurfer } from '../../core/services/wavesurfer/wavesurfer';
import { CategoriesLoader } from '../../core/services/categories-loader/categories-loader';
import { Category } from '../../models/category.model';
import { TracksLoader } from '../../core/services/tracks-loader/tracks-loader';
import { Track } from '../../models/types/track.type';

@Component({
  selector: 'app-game-page-field',
  imports: [],
  templateUrl: './game-field.html',
  styleUrl: './game-field.scss',
})
export class GameField {
  public categoriesLoader: CategoriesLoader = inject(CategoriesLoader);
  public tracksLoader: TracksLoader = inject(TracksLoader);
  public wavesurfer: Wavesurfer = inject(Wavesurfer);

  public showResultDialog = signal(false);
  public resultMessage = signal('');
  public categories = this.categoriesLoader.categories;
  public currentCategory: WritableSignal<Category | null> = signal(null);
  public currentTracks = signal<Track[]>([]);
  public currentTrackIndex = signal(0);
  private trackTimeout: any = null;

  public currentTrack = computed(() => {
    const tracks = this.currentTracks();
    const index = this.currentTrackIndex();
    return tracks.length > 0 && index < tracks.length ? tracks[index] : null;
  });

  private destroyed = signal(false);

  constructor() {
    effect(() => {
      const categories = this.categories();
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
          this.initCurrentTrack();
        });
      }
    });

    effect((onCleanup) => {
      return () => {
        if (this.wavesurfer) {
          this.wavesurfer.destroy();
        }
        this.destroyed.set(true);
      };
    });
  }

  private initCurrentTrack(): void {
    const track = this.currentTrack();
    if (!track) return;
    this.wavesurfer.init('#waveform', track.previewUrl);
  }

  private nextTrack(): void {
    const nextIndex = this.currentTrackIndex() + 1;
    if (nextIndex < this.currentTracks().length) {
      this.currentTrackIndex.set(nextIndex);
      this.initCurrentTrack();
    }
  }

  public onPlayPause(): void {
    this.wavesurfer.playPause();
  }

  public onCategorySelected(category: Category): void {
    this.currentCategory.set(category);
    this.currentTrackIndex.set(0);
  }

  public onDontKnowClick(): void {
    const currentTrack = this.currentTrack();
    if (!currentTrack) return;

    this.showResult(`The correct answer was: ${currentTrack.trackName}`);

    if (this.wavesurfer) {
      this.wavesurfer.stop();
    }
  }

  public onAnswerSelected(answer: string): void {
    const currentTrack = this.currentTrack();
    if (!currentTrack) return;

    const isCorrect = answer === currentTrack.trackName;
    this.showResult(
      isCorrect
        ? ` Correct! The song was: ${currentTrack.trackName}`
        : ` Incorrect! The correct answer was: ${currentTrack.trackName}`,
    );

    if (this.wavesurfer) {
      this.wavesurfer.stop();
    }
  }

  public closeDialog(): void {
    this.showResultDialog.set(false);
    this.nextTrack();
  }

  private showResult(message: string): void {
    this.resultMessage.set(message);
    this.showResultDialog.set(true);
  }
}

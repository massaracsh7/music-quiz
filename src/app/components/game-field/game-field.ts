import { Component, effect, signal } from '@angular/core';
import { Wavesurfer } from '../../shared/services/wavesurfer/wavesurfer';

@Component({
  selector: 'app-game-page-field',
  imports: [],
  templateUrl: './game-field.html',
  styleUrl: './game-field.scss',
})
export class GameField {
  public song = {
    name: 'song1',
    url: 'assets/track.mp3',
  };
  public namesVariants: string[] = ['song1', 'song2', 'song3', 'song4'];
  public showResultDialog = signal(false);
  public resultMessage = signal('');

  private destroyed = signal(false);

  constructor(public wavesurfer: Wavesurfer) {
    effect((onCleanup) => {
      this.wavesurfer.init('#waveform', this.song.url);
      onCleanup(() => {
        if (this.wavesurfer) {
          this.wavesurfer.destroy();
        }
        this.destroyed.set(true);
      });
    });
  }

  public onPlayPause(): void {
    this.wavesurfer.playPause();
  }

  public onDontKnowClick(): void {}

  public onAnswerSelected(answer: string): void {
    const isCorrect = answer === this.song.name;
    this.showResult(isCorrect);
  }

  public closeDialog(): void {
    this.showResultDialog.set(false);
  }

  private showResult(isCorrect: boolean): void {
    const message = isCorrect
      ? 'Correct! Well done!'
      : `Incorrect! The correct answer was: ${this.song.name}`;
    this.resultMessage.set(message);
    this.showResultDialog.set(true);
  }
}

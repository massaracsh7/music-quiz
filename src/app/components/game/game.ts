import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-game',
  templateUrl: './game.html',
  styleUrls: ['./game.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class Game {
  public song = {
    name: 'song1',
    url: 'assets/track.mp3',
  };
  public namesVariants: string[] = ['song1', 'song2', 'song3', 'song4'];
  public isPlaying = signal(false);
  public showVariants = signal(false);
  public showResultDialog = signal(false);
  public resultMessage = signal('');

  private wavesurfer: WaveSurfer | null = null;
  private destroyed = signal(false);

  constructor() {
    effect((onCleanup) => {
      this.initWaveform();
      onCleanup(() => {
        if (this.wavesurfer) {
          this.wavesurfer.destroy();
        }
        this.destroyed.set(true);
      });
    });
  }

  public onPlayPause(): void {
    if (this.wavesurfer) {
      this.wavesurfer.playPause();
      this.isPlaying.set(this.wavesurfer.isPlaying());
    }
  }

  public onKnowClick(): void {
    this.showVariants.set(true);
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

  private async initWaveform(): Promise<void> {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#4F4A85',
      progressColor: '#383351',
      url: 'assets/track.mp3',
    });

    this.wavesurfer.load(this.song.url);
    this.wavesurfer.on('audioprocess', () => {});
    this.wavesurfer.on('finish', () => {
      this.isPlaying.set(false);
    });
  }
}

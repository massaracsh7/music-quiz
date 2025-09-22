import { Injectable, signal } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Injectable({
  providedIn: 'root',
})
export class Wavesurfer {
  public currentTime = signal<number>(0);
  public isPlaying = signal<boolean>(false);
  public isFinished = signal<boolean>(false);

  private wavesurfer?: WaveSurfer;

  public init(container: string, songUrl: string, autoplay: boolean = false): void {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }

    this.wavesurfer = WaveSurfer.create({
      container,
      waveColor: '#4F4A85',
      progressColor: '#383351',
      dragToSeek: false,
      interact: false,
      url: songUrl,
    });

    this.wavesurfer.on('audioprocess', (currentTime) => {
      this.currentTime.set(Math.floor(currentTime));
    });

    this.wavesurfer.on('finish', () => {
      this.isFinished.set(true);
    });

    if (autoplay) {
      this.wavesurfer.on('ready', () => {
        this.play();
      });
    }
  }

  public play(): void {
    if (!this.wavesurfer) return;
    this.wavesurfer.play();
    this.isPlaying.set(true);
  }

  public stop(): void {
    if (!this.wavesurfer) return;
    this.wavesurfer.stop();
    this.isPlaying.set(false);
  }

  public destroy(): void {
    this.wavesurfer?.destroy();
    this.wavesurfer = undefined;
  }
}

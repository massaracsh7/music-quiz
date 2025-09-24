import { Component, input, output, effect, computed } from '@angular/core';
import { Track } from '../../../models/types/track.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-modal',
  imports: [CommonModule],
  templateUrl: './result-modal.html',
  styleUrl: './result-modal.scss',
})
export class ResultModal {
  public showResultDialog = input<boolean>();
  public currentTrack = input<Track>();
  public currentTrackNumber = input<number>();
  public totalTracks = input<number>();
  public isCorrectSignal = input<boolean>(false);
  public closeDialog = output<void>();
  public trackResults = input<boolean[]>([]);

  constructor() {
    effect(() => {
      document.body.style.overflow = this.showResultDialog() ? 'hidden' : '';
    });
  }
}

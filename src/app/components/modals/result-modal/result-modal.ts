import { Component, input, output, effect } from '@angular/core';
import { Track } from '../../../models/types/track.type';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-result-modal',
  imports: [CommonModule, TranslatePipe],
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
  public trackResults = input<Array<boolean | null>>([]);

  constructor() {
    effect(() => {
      document.body.style.overflow = this.showResultDialog() ? 'hidden' : '';
    });
  }
}

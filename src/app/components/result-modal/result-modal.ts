import { Component, input, output, effect } from '@angular/core';
import { Track } from '../../models/types/track.type';

@Component({
  selector: 'app-result-modal',
  imports: [],
  templateUrl: './result-modal.html',
  styleUrl: './result-modal.scss',
})
export class ResultModal {
  public showResultDialog = input<boolean>();
  public resultMessage = input<string>();
  public currentTrack = input<Track>();
  public closeDialog = output<void>();

  constructor() {
    effect(() => {
      document.body.style.overflow = this.showResultDialog() ? 'hidden' : '';
    });
  }
}

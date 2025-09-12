import { Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';

@Component({
  selector: 'app-video',
  imports: [],
  templateUrl: './video.html',
  styleUrl: './video.scss'
})
export class Video {
  videoLink = viewChild<ElementRef<HTMLVideoElement>>('video');

  private destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => {
      const video = this.videoLink()?.nativeElement;
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    });
  }
}

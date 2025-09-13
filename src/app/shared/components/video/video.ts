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

 ngAfterViewInit() {
    const video = this.videoLink()!.nativeElement;
    video.play().catch(() => {
    });

    this.destroyRef.onDestroy(() => {
      video.pause();
      video.src = '';
      video.load();
    });
  }
}

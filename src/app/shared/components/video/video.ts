import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [],
  templateUrl: './video.html',
  styleUrl: './video.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,


})
export class Video {
  videoLink = viewChild<ElementRef<HTMLVideoElement>>('video');

  private destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    const videoEl = this.videoLink()!.nativeElement;
    if (videoEl) {
      videoEl.play().catch(() => { });

      this.destroyRef.onDestroy(() => {
        videoEl.pause();
        videoEl.src = '';
        videoEl.load();
      });
    }
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [],
  templateUrl: './video.html',
  styleUrl: './video.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Video {
  public videoLink = viewChild<ElementRef<HTMLVideoElement>>('video');

  public destroyRef = inject(DestroyRef);

  public ngAfterViewInit(): void {
    const videoElement = this.videoLink()!.nativeElement;
    if (videoElement) {
      videoElement.play().catch(() => {});

      this.destroyRef.onDestroy(() => {
        videoElement.pause();
        videoElement.removeAttribute('src'); 
        videoElement.load();
      });
    }
  }
}

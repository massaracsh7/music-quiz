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
}

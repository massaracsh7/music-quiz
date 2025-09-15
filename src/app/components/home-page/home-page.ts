import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Video } from '../../shared/components/video/video';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule, Video],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage { }

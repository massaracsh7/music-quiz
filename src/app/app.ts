import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Toast } from './shared/components/toast/toast';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Video } from './shared/components/video/video';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Toast, Header, Footer, Video],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('music-quiz');
  public router = inject(Router);
}

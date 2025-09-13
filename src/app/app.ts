import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Toast } from './shared/components/toast/toast';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { Video } from './shared/components/video/video';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Toast, Header, Footer, Video],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('music-quiz');
  public router = inject(Router);

  public currentPath = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  public isHome = computed(() => {
    const path = this.currentPath();
    return path === '/' || path === '/home';
  });

}

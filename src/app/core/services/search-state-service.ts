import { Injectable, signal } from '@angular/core';
import { ITunesTrack } from '../../models/iTunes.model';

@Injectable({
  providedIn: 'root',
})
export class SearchStateService {
  public tracks = signal<ITunesTrack[]>([]);
  public selectedTracks = signal<ITunesTrack[]>([]);
  public isLoading = signal(false);
  public searchQuery = signal('');

  public removeFromSelectedTracks(trackId: number): void {
    const current = this.selectedTracks();
    this.selectedTracks.set(current.filter((track) => track.trackId !== trackId));
  }

  public clearSelectedTracks(): void {
    this.selectedTracks.set([]);
  }
}

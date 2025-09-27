import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ITunesResponse, ITunesTrack } from '../../models/itunes.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);

  public searchTracksToItunes(query: string, limit: number = 17): Observable<ITunesResponse> {
    const parameters = new HttpParams()
      .set('term', query)
      .set('media', 'music')
      .set('limit', limit.toString());

    return this.http.get<ITunesResponse>('https://itunes.apple.com/search', { params: parameters });
  }

  public filterOnlyTracks(tracks: ITunesTrack[]): ITunesTrack[] {
    return tracks.filter((track) => track.kind === 'song');
  }

  public searchTracks(query: string): Observable<ITunesTrack[]> {
    return this.searchTracksToItunes(query).pipe(
      map((response) => this.filterOnlyTracks(response.results)),
    );
  }
}

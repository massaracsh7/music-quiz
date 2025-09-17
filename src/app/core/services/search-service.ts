import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITunesResponse, ITunesTrack } from '../../models/i-tunes.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);

  public searchTracks(query: string, limit: number = 17): Observable<ITunesResponse> {
    const params = new HttpParams()
      .set('term', query)
      .set('media', 'music')
      .set('limit', limit.toString());

    return this.http.get<ITunesResponse>('https://itunes.apple.com/search', { params });
  }

  public filterOnlyTracks(tracks: ITunesTrack[]): ITunesTrack[] {
    return tracks.filter((track) => track.kind === 'song');
  }
}

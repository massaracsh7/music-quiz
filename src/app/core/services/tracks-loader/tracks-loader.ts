import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Track } from '../../../models/types/track.type';
import { ITunesResponse } from '../../../models/types/itunes-response';

@Injectable({
  providedIn: 'root',
})
export class TracksLoader {
  private baseUrl = 'https://itunes.apple.com/lookup';

  constructor(private http: HttpClient) {}

  public getTracksByIds(idArray: number[]): Observable<Track[]> {
    const url = `${this.baseUrl}?entity=song&id=${idArray.join(',')}`;

    return this.http
      .get<ITunesResponse>(url)
      .pipe(map((response: ITunesResponse): Track[] => response.results));
  }
}

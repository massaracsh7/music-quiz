import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ITunesTrack, TrackDocument } from '../../../models/itunes.model';

@Injectable({ providedIn: 'root' })
export class TracksLoader {
  private firestore = inject(Firestore);

  public getTracksByIds(trackIds: number[]): Observable<ITunesTrack[]> {
    if (trackIds.length === 0) return of([]);

    const tracksCollection = collection(this.firestore, 'itunesTracks');

    return collectionData(tracksCollection).pipe(
      map((documents) =>
        documents
          .map((document) => (document as TrackDocument).track)
          .filter((track) => trackIds.includes(track.trackId)),
      ),
    );
  }
}

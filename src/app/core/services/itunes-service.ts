import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { from, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { ITunesResponse } from '../../models/i-tunes.model';

@Injectable({
  providedIn: 'root'
})
export class ItunesService {
  public firestore = inject(Firestore);

  public cacheTracks(trackIds: number[]): Observable<void> {
  return from(trackIds).pipe(
    mergeMap((trackId) => {
      const docRef = doc(this.firestore, 'itunesTracks', trackId.toString());
      return from(getDoc(docRef)).pipe(
        switchMap((snap) => {
          if (snap.exists()) {
            console.log(`Track ${trackId} already cached`);
            return of(void 0);
          }
          return from(fetch(`https://itunes.apple.com/lookup?id=${trackId}`)).pipe(
            switchMap((response) => from(response.json() as Promise<ITunesResponse>)),
            switchMap((json) => {
              const trackData = json.results[0];
              if (trackData) {
                return from(setDoc(docRef, { track: trackData }))
              }
              return of(void 0);
            })
          );
        })
      );
    })
  );
}}

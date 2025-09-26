import { Injectable, inject, Signal, signal } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  onSnapshot,
  getDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, from, map, Observable, switchMap, tap, of, throwError } from 'rxjs';
import { Category } from '../../../models/category.model';
import { LeaderboardCategory } from '../../../models/leaderboard.model';
import { ItunesService } from '../itunes-service';
import { TrackDocument, ITunesTrack } from '../../../models/i-tunes.model';
import { resizeItunesArtworkUrl } from '../../../shared/helpers/image-helpers';
import { ToastService } from '../../../shared/services/toast/toast';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  public firestore = inject(Firestore);
  public itunesService = inject(ItunesService);
  public toast = inject(ToastService);

  public categories: Signal<Category[]>;

  public categoriesSignal = signal<Category[]>([]);
  public allTracksSignal = signal<ITunesTrack[]>([]);
  public allTracks = this.allTracksSignal.asReadonly();

  public loadingCategories = signal<boolean>(true);
  public loadingTracks = signal<boolean>(true);

  constructor() {
    const categoriesCollection = collection(this.firestore, 'categories');

    const categories$ = collectionData(categoriesCollection) as Observable<Category[]>;

    this.categories = toSignal(categories$, { initialValue: [] });

    this.loadCategories();
    this.loadAllTracks();
  }

  public createCategory(category: Category): Observable<string> {
    const categoryDocumentReference = doc(this.firestore, 'categories', category.id);
    return from(
      setDoc(categoryDocumentReference, {
        ...category,
      }),
    ).pipe(
      switchMap(() => this.itunesService.cacheTracks(category.tracks || [])),
      map(() => category.id),
      catchError((error) => {
        console.error('Error creating category:', error);
        return throwError(() => new Error('Failed to create category'));
      }),
    );
  }

  public addLeaderboardCategory(category: LeaderboardCategory): Observable<string> {
    const categoryDocumentReference = doc(this.firestore, 'leaderboardCategories', category.id);

    return from(
      setDoc(categoryDocumentReference, {
        ...category,
      }),
    ).pipe(
      map(() => category.id),
      catchError((error) => {
        console.error('Error add leaderboard category:', error);
        return throwError(() => new Error('Failed to add leaderboard category'));
      }),
    );
  }

  public loadCategories(): void {
    const categoriesCollection = collection(this.firestore, 'categories');
    this.loadingCategories.set(true);
    onSnapshot(categoriesCollection, (snapshot) => {
      const categoriesData = snapshot.docs.map((document) => document.data() as Category);
      this.categoriesSignal.set(categoriesData);
      this.loadingCategories.set(false);
    }, (error) => {
      this.toast.show('Failed to load categories: ' + error.message, 'error');
      this.loadingCategories.set(false);
    });
  }

  public loadAllTracks(): void {
    const tracksCollection = collection(this.firestore, 'itunesTracks');
    this.loadingTracks.set(true);
    onSnapshot(tracksCollection, (snapshot) => {
      const tracksData = snapshot.docs.map((document) => {
        const trackDocument = document.data() as TrackDocument;
        return trackDocument.track;
      });
      this.allTracksSignal.set(tracksData);
      this.loadingTracks.set(false);
    }, (error) => {
      this.toast.show('Failed to load tracks: ' + error.message, 'error');
      this.loadingTracks.set(false);
    });
  }

  public getTracksByIds(trackIds: number[]): Observable<ITunesTrack[]> {
    if (trackIds.length === 0) {
      return of([]);
    }
    return of(this.allTracksSignal().filter((track) => trackIds.includes(track.trackId)));
  }

  public getCategoryById(id: string): Observable<Category | null> {
    const categoriesDocumentReference = doc(this.firestore, 'categories', id);
    return from(getDoc(categoriesDocumentReference)).pipe(
      map((documentSnap) => (documentSnap.exists() ? (documentSnap.data() as Category) : null)),
    );
  }

  public updateCategory(category: Category): Observable<void> {
    const categoriesDocumentReference = doc(this.firestore, 'categories', category.id);
    return from(setDoc(categoriesDocumentReference, category)).pipe(
      switchMap(() => this.itunesService.cacheTracks(category.tracks || [])),
    );
  }

  public deleteCategory(id: string): Observable<void> {
    const categoriesDocumentReference = doc(this.firestore, 'categories', id);
    return from(deleteDoc(categoriesDocumentReference));
  }

  public deleteLeaderboardCategory(id: string): Observable<void> {
    const categoryDocument = doc(this.firestore, 'leaderboardCategories', id);
    return from(deleteDoc(categoryDocument));
  }

  public getFirstTrackArtwork(category: Category): string | null {
    if (!category.tracks || category.tracks.length === 0) {
      return null;
    }
    const firstTrackId = category.tracks[0];

    const firstTrack = this.allTracks().find((track) => track.trackId === firstTrackId);

    if (!firstTrack) {
      return null;
    }
    return resizeItunesArtworkUrl(firstTrack.artworkUrl100);
  }
}

import { Injectable, inject, Signal } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, from, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { Category } from '../../../models/category.model';
import { LeaderboardCategory } from '../../../models/leaderboard.model';
import { ItunesService } from '../itunes-service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  public firestore = inject(Firestore);
  public itunesService = inject(ItunesService);

  public categories: Signal<Category[]>;

  constructor() {
    const categoriesCollection = collection(this.firestore, 'categories');

    const categories$ = collectionData(categoriesCollection) as Observable<Category[]>;

    this.categories = toSignal(categories$, { initialValue: [] });
  }

  public createCategory(category: Category): Observable<string> {
    const categoryDocumentReference = doc(this.firestore, 'categories', category.id);
    return from(
      setDoc(categoryDocumentReference, {
        ...category,
      }),
    ).pipe(switchMap(() => this.itunesService.cacheTracks(category.tracks || [])),
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
}

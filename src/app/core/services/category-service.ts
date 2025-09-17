import { Injectable, inject, Signal } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { Category } from '../../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  public firestore = inject(Firestore);

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
    ).pipe(
      map(() => category.id),
      catchError((error) => {
        console.error('Error creating category:', error);
        return throwError(() => new Error('Failed to create category'));
      }),
    );
  }
}

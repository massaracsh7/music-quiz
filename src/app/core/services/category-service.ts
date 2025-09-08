import { Injectable, inject, signal, effect, Signal } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private firestore = inject(Firestore);

  public categories: Signal<Category[]>;

  constructor() {
    const categoriesCollection = collection(this.firestore, 'categories');

    const categories$ = collectionData(categoriesCollection) as Observable<Category[]>;

    this.categories = toSignal(categories$, { initialValue: [] });

  }

}

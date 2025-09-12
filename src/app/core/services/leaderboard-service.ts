import { inject, Injectable, Signal, effect } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LeaderboardCategory, LeaderboardUser } from '../../models/leaderboard.model';
import { toSignal } from '@angular/core/rxjs-interop';

export class LeaderboardService {
  public firestore = inject(Firestore);
  public leaderboards: Signal<LeaderboardCategory[]>;

  constructor() {
    const leaderboardCollection = collection(this.firestore, 'leaderboardCategories');
    const leaderboards$ = collectionData(leaderboardCollection, { idField: 'id' }) as Observable<
      LeaderboardCategory[]
    >;
    this.leaderboards = toSignal(leaderboards$, { initialValue: [] });
  }

  public getUsersForCategory(categoryId: string): Observable<LeaderboardUser[]> {
    const usersCol = collection(this.firestore, `leaderboardCategories/${categoryId}/users`);
    return collectionData(usersCol, { idField: 'email' }) as Observable<LeaderboardUser[]>;
  }

  public setUserScore(categoryId: string, userEmail: string, score: number): Promise<void> {
    const userDocument = doc(
      this.firestore,
      `leaderboardCategories/${categoryId}/users/${userEmail}`,
    );
    return setDoc(userDocument, { score }, { merge: true });
  }
}

import { inject, Injectable, Signal } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LeaderboardCategory, LeaderboardUser } from '../../models/leaderboard.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConvertToDashIdPipe } from '../../shared/pipes/convert-to-dash-id-pipe';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  public firestore = inject(Firestore);
  public leaderboards: Signal<LeaderboardCategory[]>;

  private convertToDashIdPipe = new ConvertToDashIdPipe();

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

  public setUserScore(categoryName: string, userEmail: string, score: number): Promise<void> {
    const categoryId = this.convertToDashIdPipe.transform(categoryName);

    const userDocument = doc(
      this.firestore,
      `leaderboardCategories/${categoryId}/users/${userEmail}`,
    );
    return setDoc(userDocument, { score }, { merge: true });
  }
}

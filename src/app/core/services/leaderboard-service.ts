import { inject, Injectable, Signal, effect } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LeaderboardCategory, LeaderboardUser } from '../../models/leaderboard.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
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

  public getUsersForCategory(categoryId: string): Signal<LeaderboardUser[]> {
    const usersCol = collection(this.firestore, `leaderboardCategories/${categoryId}/users`);
    const users$ = collectionData(usersCol, { idField: 'email' }) as Observable<LeaderboardUser[]>;
    return toSignal(users$, { initialValue: [] });
  }
}

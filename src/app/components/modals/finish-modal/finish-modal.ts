import { Component, effect, inject, input, output } from '@angular/core';
import { Category } from '../../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish-modal',
  imports: [],
  templateUrl: './finish-modal.html',
  styleUrl: './finish-modal.scss',
})
export class FinishModal {
  public showFinishDialog = input<boolean>();
  public categories = input<Category[]>([]);
  public score = input<number>();
  public closeDialog = output<void>();
  public onCategorySelected = output<Category>();
  private router = inject(Router);

  constructor() {
    effect(() => {
      document.body.style.overflow = this.showFinishDialog() ? 'hidden' : '';
    });
  }

  public onExit(): void {
    this.router.navigate(['/leaderboard']);
  }
}

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameField } from '../game-field/game-field';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.html',
  styleUrls: ['./game-page.scss'],
  standalone: true,
  imports: [CommonModule, GameField],
})
export class GamePage {
  public categoryId = input<string | null>(null);
}

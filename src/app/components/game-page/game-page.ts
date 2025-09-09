import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameField } from '../game-field/game-field';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.html',
  styleUrls: ['./game-page.scss'],
  standalone: true,
  imports: [CommonModule, GameField],
})
export class GamePage {}

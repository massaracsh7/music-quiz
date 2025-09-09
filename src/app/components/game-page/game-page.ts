import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import WaveSurfer from 'wavesurfer.js';
import { GameField } from '../game-field/game-field';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.html',
  styleUrls: ['./game-page.scss'],
  standalone: true,
  imports: [CommonModule, GameField],
})
export class GamePage {}

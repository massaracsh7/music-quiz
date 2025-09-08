import { Component } from '@angular/core';
import { Game } from '../game/game';

@Component({
  selector: 'app-home-page',
  imports: [Game],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}

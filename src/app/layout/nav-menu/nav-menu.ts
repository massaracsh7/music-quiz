import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavList } from './nav-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-menu',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.scss',
  standalone: true,
})
export class NavMenu {
  public navLinks = NavList;
}

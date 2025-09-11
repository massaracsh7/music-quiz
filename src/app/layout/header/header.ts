import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavMenu } from '../nav-menu/nav-menu';
import { UserMenu } from '../user-menu/user-menu';
import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NavMenu, UserMenu, ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavMenu } from '../nav-menu/nav-menu';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NavMenu],
  templateUrl: './header.html',
  styleUrl: './header.scss',
   standalone: true
})
export class Header {

}

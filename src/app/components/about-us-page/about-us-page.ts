import { Component } from '@angular/core';
import { students } from './students-data.const';

@Component({
  selector: 'app-about-us-page',
  imports: [],
  templateUrl: './about-us-page.html',
  styleUrl: './about-us-page.scss',
})
export class AboutUsPage {
  public students = students;
}

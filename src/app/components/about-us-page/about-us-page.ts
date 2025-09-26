import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { StudentInterface } from './student.interface';
import { students } from './students-data.const';

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './about-us-page.html',
  styleUrl: './about-us-page.scss',
})
export class AboutUsPage {
  public students: StudentInterface[] = students;

  constructor(public translate: TranslateService) {}
}

import { Component, effect, OnInit } from '@angular/core';
import { students } from './students-data.const';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { StudentInterface } from './student.interface';

@Component({
  selector: 'app-about-us-page',
  imports: [TranslatePipe],
  templateUrl: './about-us-page.html',
  styleUrl: './about-us-page.scss',
})
export class AboutUsPage {
  public translatedStudents: StudentInterface[] = [];

  constructor(private translate: TranslateService) {
    effect(() => {
      this.translatedStudents = students.map((student) => ({
        ...student,
        name: this.translate.instant(student.name),
        role: this.translate.instant(student.role),
        description: this.translate.instant(student.description),
      }));
    });
  }
}

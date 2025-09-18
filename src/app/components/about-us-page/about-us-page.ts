import { Component } from '@angular/core';

export type StudentInterface = {
  img: string;
  name: string;
  role: string;
  description: string;
  task: string[];
  linGit: string;
}

@Component({
  selector: 'app-about-us-page',
  imports: [],
  templateUrl: './about-us-page.html',
  styleUrl: './about-us-page.scss',
})
export class AboutUsPage {
  public students: StudentInterface[] = [
    {
      img: 'https://i.postimg.cc/DyDhpxkq/96a20478-7558-4e35-817d-f7a6cc97c03c.png',
      name: 'Katsiaryna Tatarynava',
      role: 'Student',
      description:
        "Katsiaryna configured and integrated the Firebase cloud platform for data storage, implemented the database structure and optimized queries. She has developed a complete authentication and authorization system, including registration and login. She also developed a home page with intuitive navigation and optimized production. The project also implements a theme design system with switching between light and dark modes.",
      task: [
        'Firebase', 'Auth', 'Services', 'Main page', 'Theme'
      ],
      linGit: 'https://github.com/massaracsh7',
    },
    {
      img: 'https://i.postimg.cc/HnhqKkKp/30bf1b94-17fc-4595-bea1-9cc1004c1d0a.png',
      name: 'Dzmitry Turok',
      role: 'Student',
      description:
        "Dzmitry created the project architecture from scratch, configured the build and configuration of the development environment. Implemented an audio playback system with advanced configuration and management. He have set up a routing system on the website. He also developed a game page with interactive elements and animations.",
      task: [
        'Init project', 'Config Audio Player', 'Routing', 'Game page',
      ],
      linGit: 'https://github.com/tubyliec',
    },
    {
      img: 'https://i.postimg.cc/4yyCB9WL/e022ac89-17b1-414e-b466-7d957b7f6622.png',
      name: 'Evgeniya Tsel',
      role: 'Student',
      description:
        "Evgeniya has developed a leaderboard with dynamic data updates, sorting and visualization of user achievements.  She also created an information page about the project developers.  Implemented the functionality of creating categories, including API search in iTunes.",
      task: [
        'LeaderBoard', 'About Us Page', 'Create category',
      ],
      linGit: 'https://github.com/jnuka',
    },
  ];
}

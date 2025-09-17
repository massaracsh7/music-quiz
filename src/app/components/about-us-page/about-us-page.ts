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
      img: 'https://images.unsplash.com/photo-1708346217879-a17c15dd96b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Katsiaryna Tatarynava',
      role: 'Student',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make.",
      task: [
        'Firebase', 'Auth', 'Services', 'Main page', 'Theme'
      ],
      linGit: 'https://github.com/massaracsh7',
    },
    {
      img: 'https://images.unsplash.com/photo-1708242828015-d4c591944496?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Dzmitry Turok',
      role: 'Student',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      task: [
        'Init project', 'Config Audio Player', 'Routing', 'Game page',
      ],
      linGit: 'https://github.com/tubyliec',
    },
    {
      img: 'https://plus.unsplash.com/premium_photo-1709772918943-83a29278e406?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Evgeniya Tsel',
      role: 'Student',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
      task: [
        'LeaderBoard', 'About Us Page', 'Create category',
      ],
      linGit: 'https://github.com/jnuka',
    },
  ];
}

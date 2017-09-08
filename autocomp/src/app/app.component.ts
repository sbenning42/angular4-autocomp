import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  urls = [
    'http://localhost:4200/assets/images/1.jpg',
    'http://localhost:4200/assets/images/2.jpg',
    'http://localhost:4200/assets/images/3.jpg',
    'http://localhost:4200/assets/images/4.jpg',
    'http://localhost:4200/assets/images/5.jpg',
    'http://localhost:4200/assets/images/6.jpg',
    'http://localhost:4200/assets/images/7.jpg',
    'http://localhost:4200/assets/images/8.jpg',
    'http://localhost:4200/assets/images/9.jpg',
    'http://localhost:4200/assets/images/10.jpg',
  ];
}

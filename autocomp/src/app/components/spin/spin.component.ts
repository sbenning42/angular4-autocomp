import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.css']
})
export class SpinComponent implements OnInit {

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
  ]

  imgUrls: Observable<string[]>

  constructor() {
  }

  ngOnInit() {
    this.imgUrls = new Observable(subscriber => {
      subscriber.next(this.urls)
    })
  }
}

import { Component, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild
} from '@angular/animations';

// import * as $ from 'jquery/dist/jquery.min.js'

@Component({
  selector: 'app-carousel-v3',
  templateUrl: './carousel-v3.component.html',
  styleUrls: ['./carousel-v3.component.css'],
  animations: [
    trigger('slide', [
      state('start', style({})),
      state('left', style({})),
      state('right', style({})),

      transition('start => left', [animate('1s ease-in-out'), style({transform: 'translateX(-100%)'})]),
    ])
  ]
})
export class CarouselV3Component implements OnInit, OnDestroy {

  @Input() urls: Observable<string[]>;
  @Input() widthCarousel: string;
  @Input() widthImg: string;
  @Input() minWidthImg: string;

  slideState: string;
  inAnimation: boolean;

  sub: Subscription;

  carousel: Carousel;
  ready: boolean;

  constructor() {
    this.ready = false
    this.slideState = 'start'
    this.inAnimation = false
  }

  ngOnInit() {
    this.sub = this.urls.share().subscribe(
      urls => {
        this.carousel = new Carousel(urls)
        this.ready = true
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  animate(direction: string) {
    this.slideState = direction
  }

  inAnimationToggle() {
    console.log(`inAnimation toggle`)
    this.inAnimation = !this.inAnimation
  }

  start($event) {
    if ($event.fromState === 'start' && $event.toState === 'left' && !this.inAnimation) {
      console.log(`Animation start`)
      this.inAnimationToggle()
    }
  }

  done($event) {
    if ($event.fromState === 'start' && $event.toState === 'left' && this.inAnimation) {
     console.log(`Animation done`)
      this.inAnimationToggle()
      console.log(`Going forward`)
       this.carousel.move(this.slideState)
       this.slideState = 'start'

    }
  }

}


class Carousel {

  private _urls: string[];
  private _length: number;
  private _index: number;

  private _sub: Subscription;


  constructor(
    public urls: string[]
  ) {
    this._index = 0
    this._urls = urls
    this._length = urls.length
  }

  templateIndex(index: number) {
    return this.safeIndex(this._index + index)
  }

  templateUrl(index: number) {
    return this._urls[this.templateIndex(index)]
  }

  safeIndex(index: number) {
    const mod = index % this._length
    return (mod >= 0 ? mod : this._length - mod)
  }

  safeMove(offset: number) {
    this._index = this.safeIndex(this._index + offset)
  }

  move(direction: string) {
    if (direction === 'left') {
      this.forward()
    } else if (direction === 'right') {
      this.back()
    }
  }

  forward() {
    this.safeMove(1)
  }

  back() {
    this.safeMove(-1)
  }

}

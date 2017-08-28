import { Component, OnInit, Input } from '@angular/core';

import { Resource } from '../../models/resource';
import { ResourceService } from '../../services/resource.service';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

class CarouselItem {
  constructor(
    public url: string,
    public alt: string,
    public state: string
  ) { }
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('imgState', [
      state('in', style({transform: 'translateX(0%)'})),
      state('outLeft', style({transform: 'translateX(-100%)'})),
      state('outRight', style({transform: 'translateX(100%)'})),

      transition('in <=> outLeft, in <=> outRight', [
        animate(700)
      ])
  ])]
})
export class CarouselComponent implements OnInit {

  imgs = <CarouselItem[]>[]

  index = 0
  length = 0

  @Input() width: number
  @Input() height: number
  @Input() imgsUrl: string[]

  constructor() { }

  ngOnInit() {
    this.index = 0
    this.length = this.imgsUrl.length - 1
    this.imgsUrl.forEach(
      (imgUrl, index) => this.imgs.push(
        new CarouselItem(imgUrl, imgUrl, (index ? 'outRight' : 'in'))))
  }

  getCarouselWidth() {
    return this.width !== undefined ? `${this.width}px` : '100%'
  }
  getCarouselHeight() {
    return this.height !== undefined ? `${this.height}px` : '100%'
  }
  getImgWidth() {
    return this.width !== undefined ? `${this.width}px` : '100%'
  }
  getImgHeight() {
    return this.height !== undefined ? `${this.height}px` : '100%'
  }

  getImgDisplay(img) {
    return img === this.getActive() ? 'relative' : 'absolute'
  }

  isLeftDisabled(): boolean {
    return this.index <= 0
  }

  isRightDisabled(): boolean {
    return this.index >= this.length
  }

  getImg(index: number) {
    return this.imgs[index]
  }
  getActive() {
    return this.getImg(this.index)
  }

  goLeft(): void {
    if (!this.isLeftDisabled()) {
      this.getActive().state = 'outRight'
      this.index -= 1
      this.getActive().state = 'in'
    }
  }
  goRight(): void {
    if (!this.isRightDisabled()) {
      this.getActive().state = 'outLeft'
      this.index += 1
      this.getActive().state = 'in'
    }
  }

}

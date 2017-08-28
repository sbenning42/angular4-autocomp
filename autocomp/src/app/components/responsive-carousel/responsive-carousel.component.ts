import { Component, OnInit, Input } from '@angular/core';

import { Resource } from '../../models/resource';
import { ResourceService } from '../../services/resource.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

class CarouselItem {
  constructor(
    public url: string,
    public alt: string,
    public state: string
  ) { }
}

@Component({
  selector: 'app-responsive-carousel',
  templateUrl: './responsive-carousel.component.html',
  styleUrls: ['./responsive-carousel.component.css'],
  animations: [

    trigger('leftAnim', [
      state('in', style({transform: 'scale(1, 1)'})),
      state('outL', style({transform: 'translateX(-50%) scale(0, 1)'})),
      state('outR', style({transform: 'scale(0, 1)'})),

      transition('in => outL', [animate(1000)]),
      transition('in => outR', [animate(1000)]),

      transition('outL => in', [animate(1000)]),
      transition('outR => in', [animate(1000)]),
    ])
  ]
})
export class ResponsiveCarouselComponent implements OnInit {

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
        new CarouselItem(imgUrl, imgUrl, (index ? 'outR' : 'in'))))
  }

  getCarouselWidth() {
    return this.width !== undefined ? `${this.width}px` : '100%'
  }
  getImgWidth() {
    return this.width !== undefined ? `${this.width}px` : '100%'
  }

  isLeftDisabled(): boolean {
    return this.index <= 0
  }

  isRightDisabled(): boolean {
    return this.index >= this.length
  }

  isVisible(img) {
    return img === this.getMiddle()
  }

  getImg(index: number) {
    return this.imgs[index]
  }

  getLeft() {
    if (!this.isLeftDisabled()) {
      return this.getImg(this.index - 1)
    }
    return null
  }
  getMiddle() {
    return this.getImg(this.index)
  }
  getRight() {
    if (!this.isRightDisabled()) {
      return this.getImg(this.index + 1)
    }
    return null
  }

  goLeft(): void {
    if (!this.isLeftDisabled()) {
      this.getMiddle().state = 'outR'
      this.index -= 1
      this.getMiddle().state = 'in'
    }
  }
  goRight(): void {
    if (!this.isRightDisabled()) {
      this.getMiddle().state = 'outL'
      this.index += 1
      this.getMiddle().state = 'in'
    }
  }

}

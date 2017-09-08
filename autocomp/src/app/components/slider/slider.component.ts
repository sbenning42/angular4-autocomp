import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    trigger('slide', [
      state('left', style({transform: 'translateX(-200%)'})),
      state('middle', style({transform: 'translateX(-100%)'})),
      state('right', style({transform: 'translateX(0%)'})),
      transition('middle => left', [animate('200ms ease-in-out')]),
      transition('middle => right', [animate('200ms ease-in-out')]),
      transition('right => middle', [animate('0ms')]),
      transition('left => middle', [animate('0ms')]),
    ])
  ]
})
export class SliderComponent implements OnInit {

  @Input() urls: string[];
  @Input() width: string;

  @Output() slideLeftEvent = new EventEmitter();
  @Output() slideRightEvent = new EventEmitter();

  storage: ItemStorage;
  slider: Slider;
  slideState: string;

  constructor() {
    this.slideState = 'middle'
  }

  ngOnInit() {
    this.storage = new ItemStorage(this.urls)
    this.slider = new Slider(this.storage)
  }

  onResize() {
    this.storage.onResize()
  }

  slideLeft() {
    this.slideState = 'left'
  }

  slideRight() {
    this.slideState = 'right'
  }

  done($event) {
    switch ($event.fromState) {
      case 'left': {
        this.doneFromLeft($event)
        break
      }
      case 'middle': {
        this.doneFromMiddle($event)
        break
      }
      case 'right': {
        this.doneFromRight($event)
        break
      }
      default: return
    }
  }

  doneFromLeft($event) {
    switch ($event.toState) {
      case 'middle': {
        break
      }
      case 'right': {
        break
      }
      default: return
    }
  }

  doneFromMiddle($event) {
    switch ($event.toState) {
      case 'left': {
        console.log('Reset from m to l')
        this.storage.sMoveIndex(1)
        this.slideState = 'middle'
        break
      }
      case 'right': {
        console.log('Reset from m to r')
        this.storage.sMoveIndex(-1)
        this.slideState = 'middle'
        break
      }
      default: return
    }
  }

  doneFromRight($event) {
    switch ($event.toState) {
      case 'left': {
        break
      }
      case 'middle': {
        break
      }
      default: return
    }
  }

  totourl(i: number) {
    let item
    if (i === 0) {
      item = this.storage.getItemFromIndex(-1)
    } else if (i === 1) {
      item = this.storage.getItemAtIndex()
    } else if (i === 2) {
      item = this.storage.getItemFromIndex(1)
    }
    return item ? item.src : undefined
  }

}

class Slider {

  storage: ItemStorage;

  contentSrc: string;
  shadowSrc: string;

  constructor(storage: ItemStorage) {
    this.storage = storage
    const content = this.storage.getItemAtIndex()
    if (content) {
      this.contentSrc = content.src
    }
    const shadow = this.storage.getItemFromIndex(1)
    if (shadow) {
      this.shadowSrc = shadow.src
    }
  }

}

class ItemStorage {

  height: number;
  items: Item[];
  length: number;
  index: number;

  loaded: number;

  constructor(srcs: string[]) {
    this.index = 0
    this.length = srcs.length
    this.items = srcs.map(src => {
      const item = new Item(src)
      item.load()
      return item
    })
  }

  sIndex(offset: number) {
    let index = (this.index + offset) % this.length
    index = index < 0 ? this.length + index : index
    return index
  }

  sMoveIndex(offset: number) {
    this.index = this.sIndex(offset)
  }

  getItemAtIndex() {
    return this.items[this.index]
  }

  getItemFromIndex(offset: number) {
    return this.items[this.sIndex(offset)]
  }

  getItemFrom(offset: number) {
    return this.items[this.sIndex(offset)]
  }

  onResize() {
    console.log('Resized')
    this.height = 0
    this.items.forEach(item => {
      if (this.height < item.imgLoaded.clientHeight) {
        this.height = item.imgLoaded.clientHeight
      }
    })
  }
}

class Item {

  static id = 0;

  id: number;
  src: string;
  img: HTMLImageElement;
  imgLoaded: HTMLImageElement;
  top: number;

  constructor(url: string) {
    this.id = ++Item.id
    this.src = url
    this.img = new Image()
  }

  load() {
    this.img.src = this.src
  }

  setTop(top: number) {
    this.top = top
  }

  getTop(): number {
    return this.top
  }

}

import { Component, OnInit, Input, Renderer2, ElementRef  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
  selector: 'app-carousel-v2',
  templateUrl: './carousel-v2.component.html',
  styleUrls: ['./carousel-v2.component.css'],
  animations: [
    trigger('slide', [
      transition('static => slideLeft', [
        style({transform: 'translateX(0%)'}),
        animate('500ms ease-in-out',
        style({transform: 'translateX(-100%)'}))
      ]),
      transition('static => slideRight', [
        style({transform: 'translateX(0%)'}),
        animate('500ms ease-in-out',
        style({transform: 'translateX(100%)'}))
      ]),
      transition('right => static', [
        style({transform: 'translateX(100%)'}),
        animate('500ms ease-in-out',
        style({transform: 'translateX(0%)'}))
      ]),
      transition('left => static', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms ease-in-out',
        style({transform: 'translateX(0%)'}))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {

  static readonly CAROUSEL_SELECTOR: string = 'carousel-container'

  @Input() imgUrls: Observable<string[]>;
  @Input() width: string;

  carouselStyle: { width: string, height: string };
  imgStyle: { width: string, height: string };
  mirrorStyle: { top: string };

  imgs: {id: number, e: HTMLImageElement, s: number}[] = [];

  carouselStorage: CarouselStorage;
  carouselSelect: CarouselSelect;
  carouselAnimation: CarouselAnimation;
  carouselEventHandler: CarouselEventHandler;
  carouselDOMAccess: CarouselDOMAccess;

  carouselHeight: number;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.carouselAnimation = new CarouselAnimation()
    this.carouselEventHandler = new CarouselEventHandler()
    this.carouselDOMAccess = new CarouselDOMAccess(this.renderer, this.elementRef, CarouselComponent.CAROUSEL_SELECTOR)
    this.carouselHeight = 0
  }

  ngOnInit() {
    this.imgStyle = {
      width: '100%',
      height: 'auto'
    }
    this.mirrorStyle = {
      top: '0'
    }
    this.carouselStyle = {
      width: (this.width ? this.width : '100%'),
      height: undefined
    }
    this.carouselStorage = new CarouselStorage(this.imgUrls, this.carouselDOMAccess)
    this.carouselSelect = new CarouselSelect(this.imgUrls)
    /*this.imgUrls.subscribe(
      (imgUrls: string[]) => {
        let i = 0
        imgUrls.forEach((url: string) => {
          const img = new Image()
          this.imgs.push({id: i++, e: img, s: 0})
          img.onload = ($event) => {
            const imgLoaded = (<HTMLImageElement>$event.srcElement)
            const futurHeight = (
              (this.carouselDOMAccess.carousel().clientWidth
              * (<HTMLImageElement>$event.srcElement).height)
              / (<HTMLImageElement>$event.srcElement).width)
              if (futurHeight > this.carouselHeight) {
                this.carouselStyle.height = `${(this.carouselHeight = futurHeight).toString()}px`
              }
            const wrapImg = this.imgs.find(imgSearch => imgSearch.e === imgLoaded)
            wrapImg.s = futurHeight
          }
          img.src = url
        })
      },
      (errors: any): void => console.log(<any>errors))*/
  }

  onResize($event) {
    /*this.carouselHeight = 0
    this.imgs.forEach(img => {
      const futurHeight = (
        (this.carouselDOMAccess.carousel().clientWidth
        * img.e.height)
        / img.e.width)
        if (futurHeight > this.carouselHeight) {
          this.carouselStyle.height = `${(this.carouselHeight = futurHeight).toString()}px`
        }
      img.s = futurHeight
    })*/
    this.carouselStorage.onResizeHandler()
  }

  isInAnimation(): boolean {
    return this.carouselAnimation.inAnimation
  }

  signEvent($event): boolean {
    return ($event.fromState === 'static'
      && ($event.toState === 'slideLeft'
        || $event.toState === 'slideRight'))
  }

  animate(slideDirection: string): void {
    if (!this.isInAnimation()) {
      this.carouselSelect.selectMirror(slideDirection)
      
        const wrapImg = this.imgs.find(imgSearch => imgSearch.e.src === this.carouselSelect.mirror)
        const pad = (this.carouselHeight - wrapImg.s) / 2
        this.mirrorStyle.top = `${pad}`
      this.carouselAnimation.animate(slideDirection)
    }
  }

  start($event) {
    if (this.signEvent($event)) {
      this.carouselAnimation.start()
    }
  }

  done($event) {
    if (this.signEvent($event)) {
      this.carouselSelect.move($event.toState)
      this.carouselAnimation.done()
    }
  }

}

class CarouselAnimation {
  inAnimation: boolean;
  imgState: string;
  mirrorState: string;

  constructor() {
    this.inAnimation = false
    this.imgState = 'static'
    this.mirrorState = ''
  }

  toggleInAnimation() {
    this.inAnimation = !this.inAnimation
  }

  slideLeft() {
    this.mirrorState = 'right'
    this.imgState = 'slideLeft'
  }

  slideRight() {
    this.mirrorState = 'left'
    this.imgState = 'slideRight'
  }

  animate(slideDirection: string): void {
    switch (slideDirection) {
      case 'slideLeft': this.slideLeft(); break
      case 'slideRight': this.slideRight(); break
      default: return
    }
    this.toggleInAnimation()
  }

  start(): void {
      this.mirrorState = 'static'
  }

  done() {
      this.toggleInAnimation()
      this.imgState = 'static'
      this.mirrorState = ''
  }

}

class CarouselDOMAccess {

  renderer: Renderer2;
  elementRef: ElementRef;
  selector: string;

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    selector: string
  ) {
    this.elementRef = elementRef
    this.renderer = renderer
    this.selector = selector
  }

  getNativeHTMLElement(): HTMLElement {
    return <HTMLElement>this.elementRef.nativeElement
  }

  getCarouselElement(): Element {
    return this.getNativeHTMLElement().getElementsByClassName(this.selector)[0]
  }

  carousel(): Element {
    return this.getCarouselElement()
  }

}

class CarouselStyle {

}

class CarouselEventHandler {

}

class CarouselItem {

  static id = 0;

  storage: CarouselStorage;
  carouselDOMAccess: CarouselDOMAccess;
  id: number;
  src: string;
  img: HTMLImageElement;
  naturalWidth: number;
  naturalHeight: number;
  rederedHeight: number;
  top: number;

  constructor(
    src: string,
    carouselDOMAccess: CarouselDOMAccess,
    storage: CarouselStorage
  ) {
    this.storage = storage
    this.id = ++CarouselItem.id
    this.rederedHeight = 0
    this.top = 0
    this.carouselDOMAccess = carouselDOMAccess
    this.img = new Image()
    this.src = src
  }

  majRenderedHeight() {
    const clientWidth = this.carouselDOMAccess.carousel().clientWidth
    this.rederedHeight = (clientWidth * this.naturalHeight) / this.naturalWidth
  }

  load() {
    this.img.src = this.src
  }
}

class CarouselStorage {

  maxRenderedSize = 0;

  srcsObs: Observable<string[]>
  items: CarouselItem[] = [];

  constructor(
    srcsObs: Observable<string[]>,
    carouselDOMAcces: CarouselDOMAccess
  ) {
    this.srcsObs = srcsObs
    this.srcsObs.subscribe(
      (srcs: string[]) => srcs.forEach((src: string) => {
        const item = new CarouselItem(src, carouselDOMAcces, this)
        this.items.push(item)
        item.img.onload = ($event) => {
          const that: HTMLImageElement = <HTMLImageElement>$event.srcElement
          item.naturalWidth = that.width
          item.naturalHeight = that.height
          this.majStorageHeight(item)
        }
        item.load()
    }))
  }

  majStorageHeight(item: CarouselItem) {
    item.majRenderedHeight()
    if (item.rederedHeight > this.maxRenderedSize) {
      this.maxRenderedSize = item.rederedHeight
    }
  }

  onResizeHandler() {
    this.maxRenderedSize = 0
    this.items.forEach(item => {
      this.majStorageHeight(item)
    })
  }

  onItemLoadHandler($event) {
    const that: HTMLImageElement = <HTMLImageElement>$event.srcElement
    const item = this.items.find((itemSearch: CarouselItem) => itemSearch.img === that)
    item.naturalWidth = that.width
    item.naturalHeight = that.height
    this.majStorageHeight(item)
  }

 /* dumpState() {
    let str = `CarouselStorage: MaxRenderedSize: ${this.maxRenderedSize}`
    console.log(`CarouselStorage: MaxRenderedSize: ${this.maxRenderedSize}`)
    this.items.forEach(item => {
      str += `
        id: ${item.id}
        src: ${item.src}
        naturalWidth: ${item.naturalWidth}
        natuarlHeight: ${item.naturalHeight}
        renderedHeight: ${item.rederedHeight}
        top: ${item.top}`
      console.log(`
        id: ${item.id}
        src: ${item.src}
        naturalWidth: ${item.naturalWidth}
        natuarlHeight: ${item.naturalHeight}
        renderedHeight: ${item.rederedHeight}
        top: ${item.top}
      `)
    })
    return str
  }*/
}


class CarouselSelect {

  imgs: string[];
  length: number;
  index: number;

  img: string;
  mirror: string;

  constructor(
    public srcsObs: Observable<string[]>
  ) {
    this.index = 0;
    srcsObs.subscribe(
      srcs => {
        this.imgs = srcs
        this.length = this.imgs.length
        this.setImg()
      }
    )
  }

  safeIndex(i: number) {
    return (i >= this.length ? 0 : (i < 0 ? this.length - 1 : i))
  }
  getImgI(i: number) {
    return this.imgs[this.safeIndex(i)]
  }
  setImg() {
    this.img = this.imgs[this.safeIndex(this.index)]
  }
  setMirror(direction: number) {
    this.mirror = this.imgs[this.safeIndex(this.index + direction)]
  }
  selectMirror(slideDirection: string) {
    switch (slideDirection) {
      case 'slideLeft': this.setMirror(1); break
      case 'slideRight': this.setMirror(-1); break
      default: return
    }
  }
  clearMirror() {
    this.mirror = ''
  }
  setIndex(i: number) {
    this.index = this.safeIndex(this.index + i)
  }

  forward() {
    this.setIndex(1)
  }

  back() {
    this.setIndex(-1)
  }

  move(slideDirection: string) {
    switch (slideDirection) {
      case 'slideLeft': this.forward(); break
      case 'slideRight': this.back(); break
    }
    this.setImg()
    this.clearMirror()
  }

}

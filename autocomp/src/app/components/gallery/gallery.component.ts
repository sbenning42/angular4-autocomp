import { Component, OnInit } from '@angular/core';

import { Resource } from '../../models/resource';
import { ResourceService } from '../../services/resource.service';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  animations: [
    trigger('selectState', [
      state('hidden', style({
        opacity: 1,
        transform: 'scale(0.5) translateX(-50%) translateY(-50%) rotateX(180deg)'
      })),
      state('normal', style({
        opacity: 1
      })),
      state('selected', style({
        transform: 'scale(1.5) translateY(100%) rotateX(180deg)',
        opacity: 0,
        visibility: 'hidden'
      })),

      transition('hidden <=> normal, selected <=> normal', animate('800ms ease-out')),

    ]),
    trigger('detailState', [
      state('*', style({
        opacity: 0,
      })),
      state('selected', style({
        transform: 'scale(1)',
        opacity: 1,
      })),

      transition('* <=> selected', animate('1600ms ease-out')),

    ])
  ]
})

export class GalleryComponent implements OnInit {

  handleSelection: HandleSelection
  animationState: string

  constructor(
    private resourceService: ResourceService
  ) { }

  ngOnInit() {
    this.handleSelection = new HandleSelection(this.resourceService.fakes())
  }

}

class Selection {
  constructor (
    public id: string,
    public selectionState: number,
    public animationState: string
  ) {}
}

class HandleSelection {

  resources: Resource[]
  selection: Selection[]

  selected: Resource

  constructor(resources: Resource[]) {
    this.selection = <Selection[]>[]
    this.resources = resources
    this.selected = null
    resources.forEach((resource) => {
      this.selection.push(new Selection(resource.id, 0, 'normal'))
      resource['animationState'] = 'normal'
    })
  }

  getSelected() {
    return this.selected
  }

  getSelection(resource: Resource) {
    return this.selection.find(select => select.id === resource.id)
  }

  isShow(resource: Resource) {
    return this.selected && resource.id === this.selected.id
  }

  isHide(resource: Resource) {
    const selection = this.getSelection(resource)
    return selection.selectionState === -1
  }

  show(resource: Resource) {
    if (this.selected) {
      this.reset(this.selected)
    }
    this.selected = resource
    const selection = this.getSelection(resource)
    selection.animationState = 'selected'
    selection.selectionState = 1
    resource['animationState'] = 'selected'
  }

  hide(resource: Resource) {
    if (this.isShow(resource)) {
      this.reset(this.selected)
    }
    const selection = this.getSelection(resource)
    selection.animationState = 'hidden'
    selection.selectionState = -1
    resource['animationState'] = 'hidden'
  }

  reset(resource: Resource) {
    const selection = this.getSelection(resource)
    selection.animationState = 'normal'
    selection.selectionState = 0
    resource['animationState'] = 'normal'
    if (this.isShow(resource)) {
      this.selected = null
    }
  }

}

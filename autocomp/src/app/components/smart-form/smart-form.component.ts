import { Component, OnInit } from '@angular/core';

import { Resource } from '../../models/resource';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-smart-form',
  templateUrl: './smart-form.component.html',
  styleUrls: ['./smart-form.component.css']
})
export class SmartFormComponent implements OnInit {

  empty: Resource
  resourse: Resource
  options: Resource[]

  formArgs: any

  isReady: boolean

  constructor(
    private resourceService: ResourceService
  ) { }

  ngOnInit() {
    this.isReady = false
    this.empty = this.resourceService.empty()
    this.resourse = this.resourceService.fake()
    this.options = this.resourceService.fakes()
    this.formArgs = {resource: this.resourse, empty: this.empty, options: this.options}
    this.isReady = true
  }

  ready() {
    return this.isReady
  }

}

import { Component, OnInit, Input } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { Resource } from '../../../models/resource';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  idEmptyControl = new FormControl()
  nameEmptyControl = new FormControl()
  idControl = new FormControl()
  nameControl = new FormControl()

  smartForm = new FormGroup ({
    id: this.idControl,
    name: this.nameControl,
    idEmpty: this.idEmptyControl,
    nameEmpty: this.nameEmptyControl
  });

  empty: Resource
  resource: Resource
  options: Resource[]

  matchEmptyOptions: Observable<Resource[]>
  matchOptions: Observable<Resource[]>

  isReady: boolean

  @Input() args: any

  constructor() {
  }

  ngOnInit() {
    this.empty = this.args.empty
    this.resource = this.args.resource
    this.options = this.args.options
    this.matchOptions = this.nameControl.valueChanges
      .startWith(null)
      .map(value => value ?  this.filter(value) : this.options.slice())
    this.matchEmptyOptions = this.nameEmptyControl.valueChanges
      .startWith(null)
      .map(value => value ?  this.filter(value) : this.options.slice())
  }

  filter(value: string): Resource[] {
    return this.options.filter(option => new RegExp(`^${value}`, 'gi').test(option.name));
  }

  displayOption(option: Resource) {
    if (option) {
      return option.name
    }
    return option != null ? option.name : null
  }

}

import { Injectable } from '@angular/core';

import { Resource } from '../models/resource';

@Injectable()
export class ResourceService {

  static id = 0

  _fakes = [
    {id: '1', name: 'vicky', picture: 'http://localhost:4200/assets/images/1.jpg'},
    {id: '2', name: 'alain', picture: 'http://localhost:4200/assets/images/2.jpg'},
    {id: '3', name: 'samuel', picture: 'http://localhost:4200/assets/images/3.jpg'},
    {id: '4', name: 'sarah', picture: 'http://localhost:4200/assets/images/4.jpg'},
    {id: '5', name: 'pascale', picture: 'http://localhost:4200/assets/images/5.jpg'},
    /*{id: '5', name: 'gabriel', picture: 'http://localhost:4200/assets/images/6.jpg'},
    {id: '6', name: 'natasha', picture: 'http://localhost:4200/assets/images/7.jpg'},
    {id: '7', name: 'pierre', picture: 'http://localhost:4200/assets/images/8.jpg'},
    {id: '8', name: 'gg', picture: 'http://localhost:4200/assets/images/9.jpg'},
    {id: '9', name: 'ambre', picture: 'http://localhost:4200/assets/images/10.jpg'}*/
  ]

  resources: Resource[]

  constructor() { }

  private _rdm(): number {
    const min = Math.ceil(0);
    const max = Math.floor(10);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private _fake(): Resource {
    return this._fakes[this._rdm()]
  }

  empty(): Resource {
    return new Resource()
  }

  fakes(): Resource[] {
    const fakes: Resource[] = []
    this._fakes.forEach((fake: Resource) => fakes.push(fake))
    return fakes
  }

  fake(): Resource {
    return this._fake()
  }

  gets(): Resource[] {
    return this.resources
  }

  get(id: number): Resource {
    return this.resources[id]
  }

  post(resource: Resource): Resource {
    resource.id = (++ResourceService.id).toString()
    this.resources.push(resource)
    return resource
  }

  put(resource: Resource): Resource {
    this.resources[parseInt(resource.id, 10)] = resource
    return resource
  }

}

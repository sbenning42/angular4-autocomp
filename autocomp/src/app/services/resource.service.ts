import { Injectable } from '@angular/core';

import { Resource } from '../models/resource';

@Injectable()
export class ResourceService {

  static id = 0

  _fakeNames = [
    'vicky', 'alain', 'samuel', 'sarah', 'pascale', 'babriel', 'natasha', 'pierre', 'gg', 'bbu', 'ambre'
  ]

  resources: Resource[]

  constructor() { }

  private _rdm(): number {
    const min = Math.ceil(0);
    const max = Math.floor(11);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private _fakeName(): string {
    return this._fakeNames[this._rdm()]
  }

  empty(): Resource {
    return new Resource()
  }

  fakes(): Resource[] {
    const fakes: Resource[] = []
    this._fakeNames.forEach((fkName: string) => fakes.push(new Resource(fkName, (++ResourceService.id).toString())))
    return fakes
  }

  fake(): Resource {
    return new Resource(this._fakeName(), (++ResourceService.id).toString())
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

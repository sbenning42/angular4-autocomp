export interface IResourceForm {
    name?: string
}

export interface IResource extends IResourceForm {
    picture?: string,
    id?: string
}

export class ResourceForm implements IResourceForm {
    constructor (
        public name?: string
    ) { }
}

export class Resource extends ResourceForm implements IResource {
    constructor (
        public name?: string,
        public picture?: string,
        public id?: string
    ) {
        super(name)
    }
}

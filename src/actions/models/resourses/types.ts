export const GET_RESOURCES = 'GET_RESOURCES'
export const GET_RESOURCE = 'GET_RESOURCE'
export const GET_RESOURCE_TYPES = 'GET_RESOURCE_TYPES'
export const UPDATE_RESOURCE = 'UPDATE_RESOURCE'

export const CREATE_RESOURCE = 'CREATE_RESOURCE'
export const DELETE_RESOURCE= 'DELETE_RESOURCE'

export const GET_RESOURCE_WORKSPACE = 'GET_RESOURCE_WORKSPACE'

export type TResource = {
    id?:number,
    corpus:number,
    name:string,
    resource_type:number,
    language:string,
    dialect:string,
    speech:string,
    theme:string,
    time_of_recording:string,
    place_of_recording:string,
    
    author:number,
    collector:number,
    decryptor:number,
    translator:number,
    translation_redactor:number,
    origin_redactor:number,
    commentator:number,

    published:string,
    variants:string,
    areal:string,
    extras:string,

    link:string,
}

export type TResourceType = {
    id?:number,
    name: string
}

export interface ICreateResource {
    type: typeof CREATE_RESOURCE,
    payload: TResource
}
export interface IDeleteResource {
    type: typeof DELETE_RESOURCE,
    payload: number
}
export interface IUpdateResource {
    type: typeof UPDATE_RESOURCE,
    payload: TResource
}
export interface IGetResources{
    type: typeof GET_RESOURCES,
    payload: TResource[]
}
export interface IGetResource{
    type: typeof GET_RESOURCE,
    payload: TResource
}

export interface IGetResourceTypes{
    type: typeof GET_RESOURCE_TYPES,
    payload: TResourceType[]
}

export interface IGetResourceWorkspace{
    type: typeof GET_RESOURCE_WORKSPACE,
    payload: object
}



export type resourceDispatchTypes = IGetResourceWorkspace|IGetResourceTypes|IGetResources|IUpdateResource|IDeleteResource|ICreateResource|IGetResource


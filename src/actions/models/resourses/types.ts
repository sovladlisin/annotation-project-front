export const GET_RESOURCES = 'GET_RESOURCES'
export const GET_RESOURCE = 'GET_RESOURCE'
export const UPDATE_RESOURCE = 'UPDATE_RESOURCE'
export const CREATE_RESOURCE = 'CREATE_RESOURCE'
export const DELETE_RESOURCE = 'DELETE_RESOURCE'

export const GET_RESOURCE_WORKSPACE = 'GET_RESOURCE_WORKSPACE'
export const GET_RESOURCE_TEXTS = 'GET_RESOURCE_TEXTS'

export const GET_RESOURCE_TYPES = 'GET_RESOURCE_TYPES'
export const UPDATE_RESOURCE_TYPE = 'UPDATE_RESOURCE_TYPE'
export const CREATE_RESOURCE_TYPE = 'CREATE_RESOURCE_TYPE'
export const DELETE_RESOURCE_TYPE = 'DELETE_RESOURCE_TYPE'

export const GET_MARKUPS = 'GET_MARKUPS'
export const CREATE_MARKUP = 'CREATE_MARKUP'
export const UPDATE_MARKUP = 'UPDATE_MARKUP'
export const DELETE_MARKUP = 'DELETE_MARKUP'

export const GET_ENTITIES = 'GET_ENTITIES'
export const CREATE_ENTITY = 'CREATE_ENTITY'
export const DELETE_ENTITY = 'DELETE_ENTITY'
import { TCreateAlert } from '../../alerts/types'


export type TResource = {
    id?: number,
    corpus: number,
    title: string,
    title_origin: string,
    resource_type: number,
    language: string,
    dialect: string,
    speech: string,
    theme: string,
    time_of_recording: string,

    place_of_recording: number,
    author: number,
    collector: number,
    decryptor: number,
    translator: number,
    translation_redactor: number,
    origin_redactor: number,
    commentator: number,

    published: string,
    place_of_storage: string,
    variants: string,
    areal: string,
    extras: string,

    link?: string,
}
export type TMarkup = {
    id?: number,
    name: string,
    text: number
}

export type TEntity = {
    id?: number,
    obj: number,
    position_start: number,
    position_end: number,
    markup: number,
    text?: string
}
export type TResourceText = {
    original: string,
    translation: string,
    commentary: string,
    resource: number,
}

export type TResourceType = {
    id?: number,
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
export interface IGetResources {
    type: typeof GET_RESOURCES,
    payload: TResource[]
}
export interface IGetResource {
    type: typeof GET_RESOURCE,
    payload: TResource
}

export interface IGetResourceTypes {
    type: typeof GET_RESOURCE_TYPES,
    payload: TResourceType[]
}

export interface IGetResourceWorkspace {
    type: typeof GET_RESOURCE_WORKSPACE,
    payload: object
}
export interface IGetResourceTexts {
    type: typeof GET_RESOURCE_TEXTS,
    payload: TResourceText[]
}

// Resource types ===========================

export interface ICreateResourceType {
    type: typeof CREATE_RESOURCE_TYPE,
    payload: TResourceType
}
export interface IDeleteResourceType {
    type: typeof DELETE_RESOURCE_TYPE,
    payload: number
}
export interface IUpdateResourceType {
    type: typeof UPDATE_RESOURCE_TYPE,
    payload: TResourceType
}
export interface IGetResourceTypes {
    type: typeof GET_RESOURCE_TYPES,
    payload: TResourceType[]
}

//---------------------------------

export interface IGetMarkups {
    type: typeof GET_MARKUPS
    payload: TMarkup[]
}
export interface ICreateMarkup {
    type: typeof CREATE_MARKUP
    payload: TMarkup
}
export interface IUpdateMarkup {
    type: typeof UPDATE_MARKUP
    payload: TMarkup
}
export interface IDeleteMarkup {
    type: typeof DELETE_MARKUP
    payload: number
}

// -----------------------------
export interface IGetEntities {
    type: typeof GET_ENTITIES
    payload: TEntity[]
}
export interface ICreateEntity {
    type: typeof CREATE_ENTITY
    payload: TEntity
}
export interface IDeleteEntity {
    type: typeof DELETE_ENTITY
    payload: number
}

export type resourceDispatchTypes = TCreateAlert | IGetEntities | ICreateEntity | IDeleteEntity | IGetMarkups | ICreateMarkup | IUpdateMarkup | IDeleteMarkup | IGetResourceTexts | ICreateResourceType | IDeleteResourceType | IUpdateResourceType | IGetResourceTypes | IGetResourceWorkspace | IGetResourceTypes | IGetResources | IUpdateResource | IDeleteResource | ICreateResource | IGetResource


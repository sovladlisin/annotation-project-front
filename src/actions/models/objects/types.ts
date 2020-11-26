export const GET_OBJECTS = 'GET_OBJECTS'
export const UPDATE_OBJECT = 'UPDATE_OBJECT'

export const CREATE_OBJECT = 'CREATE_OBJECT'
export const DELETE_OBJECT = 'DELETE_OBJECT'
export const GET_OBJECTS_ENTITIES = 'GET_OBJECTS_ENTITIES'

export const CREATE_ENTITY = 'CREATE_ENTITY'
export const DELETE_ENTITY = 'DELETE_ENTITY'

import { TCreateAlert } from '../../alerts/types'


export const CREATE_MARKUP = 'CREATE_MARKUP'
export const DELETE_MARKUP = 'DELETE_MARKUP'
export const GET_TEXTS_MARKUPS = 'GET_TEXTS_MARKUPS'
export const GET_MARKUPS_ENTITIES = 'GET_MARKUPS_ENTITIES'


export const GET_OBJECT_ATTRIBUTES = 'GET_OBJECT_ATTRIBUTES'
export const UPDATE_OBJECT_ATTRIBUTE = 'UPDATE_OBJECT_ATTRIBUTES'
export const CREATE_OBJECT_ATTRIBUTE = 'CREATE_OBJECT_ATTRIBUTES'
export const DELETE_OBJECT_ATTRIBUTE = 'DELETE_OBJECT_ATTRIBUTES'


export type TObject = {
    id?: number,
    parent_class: number,
    name: string,
    attributes?: object
}

export type TMarkup = {
    id?: number,
    text: number,
    name: string
}

export type TObjectAttributeValue = {
    id?: number,
    related_attribute: number,
    related_object: number,
    value: string
}

export type TEntity = {
    id?: number,
    obj: number,
    position_start: number,
    position_end: number,
    markup: number,
}



//Objects---------------------------------------

export interface ICreateObject {
    type: typeof CREATE_OBJECT,
    payload: TObject
}
export interface IDeleteObject {
    type: typeof DELETE_OBJECT,
    payload: number
}
export interface IUpdateObject {
    type: typeof UPDATE_OBJECT,
    payload: TObject
}
export interface IGetObjects {
    type: typeof GET_OBJECTS,
    payload: TObject[]
}
export interface IGetObjectsEntities {
    type: typeof GET_OBJECTS_ENTITIES,
    payload: TEntity[]
}

//Entity ---------------------------------------
export interface ICreateEntity {
    type: typeof CREATE_ENTITY,
    payload: TEntity
}
export interface IDeleteEntity {
    type: typeof DELETE_ENTITY,
    payload: number
}

//Markups ---------------------------------------
export interface ICreateMarkup {
    type: typeof CREATE_MARKUP,
    payload: TMarkup
}
export interface IDeleteMarkup {
    type: typeof DELETE_MARKUP,
    payload: number
}
export interface IGetTextsMarkups {
    type: typeof GET_TEXTS_MARKUPS,
    payload: TMarkup[]
}
export interface IGetMarkupsEntities {
    type: typeof GET_MARKUPS_ENTITIES,
    payload: TEntity[]
}



//Attributes---------------------------------------

export interface ICreateObjectAttribute {
    type: typeof CREATE_OBJECT_ATTRIBUTE,
    payload: TObjectAttributeValue
}
export interface IUpdateObjectAttribute {
    type: typeof UPDATE_OBJECT_ATTRIBUTE,
    payload: TObjectAttributeValue
}
export interface IGetObjectAttributes {
    type: typeof GET_OBJECT_ATTRIBUTES,
    payload: TObjectAttributeValue[]
}

export type objectDispatchTypes = TCreateAlert | IGetObjectAttributes | IUpdateObjectAttribute | ICreateObjectAttribute | IGetObjectsEntities | IGetMarkupsEntities | IGetTextsMarkups | IGetObjects | IUpdateObject | IDeleteObject | ICreateObject | ICreateEntity | IDeleteEntity | ICreateMarkup | IDeleteMarkup


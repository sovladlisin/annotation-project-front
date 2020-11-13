export const GET_CLASSES = 'GET_CLASSES'
export const UPDATE_CLASS = 'UPDATE_CLASS'

export const CREATE_CLASS = 'CREATE_CLASS'
export const DELETE_CLASS = 'DELETE_CLASS'

export const DELETE_CLASS_ATTRIBUTE = 'DELETE_CLASS_ATTRIBUTE'
export const CREATE_CLASS_ATTRIBUTE = 'CREATE_CLASS_ATTRIBUTE'
export const UPDATE_CLASS_ATTRIBUTE = 'UPDATE_CLASS_ATTRIBUTE'
export const GET_CLASS_ATTRIBUTES = 'GET_CLASS_ATTRIBUTES'


export type TClass = {
    id?: number,
    parent: number,
    name: string,
    corpus: number,
}

export interface ICreateClass {
    type: typeof CREATE_CLASS,
    payload: TClass
}
export interface IDeleteClass {
    type: typeof DELETE_CLASS,
    payload: number
}
export interface IUpdateClass {
    type: typeof UPDATE_CLASS,
    payload: TClass
}
export interface IGetClasses {
    type: typeof GET_CLASSES,
    payload: TClass[]
}

// Attributes ===============================

export type TClassAttribute = {
    id?: number,
    related_class: number,
    name: string
}

export interface TCreateClassAttribute {
    type: typeof CREATE_CLASS_ATTRIBUTE
    payload: TClassAttribute
}

export interface TDeleteClassAttribute {
    type: typeof DELETE_CLASS_ATTRIBUTE
    payload: number
}

export interface TUpdateClassAttribute {
    type: typeof UPDATE_CLASS_ATTRIBUTE
    payload: TClassAttribute
}

export interface TGetClassAttributes {
    type: typeof GET_CLASS_ATTRIBUTES
    payload: TClassAttribute[]
}

export type classDispatchTypes = TGetClassAttributes | TUpdateClassAttribute | TDeleteClassAttribute | TCreateClassAttribute | IGetClasses | IUpdateClass | IDeleteClass | ICreateClass


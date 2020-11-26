
export const CREATE_RELATION = 'CREATE_RELATION'
export const DELETE_RELATION = 'DELETE_RELATION'
export const UPDATE_RELATION = 'UPDATE_RELATION'
export const GET_RELATIONS = 'GET_RELATIONS'

export const GET_LINKS = 'GET_LINKS'
export const ADD_LINK = 'ADD_LINK'

import { TCreateAlert } from '../../alerts/types'

export type TRelation = {
    id?: number,
    name: string
}

export type TNewLink = {
    relation: number,
    parent_model_pk: number,
    parent_model_name: string,
    child_model_pk: number,
    child_model_name: string,
}

//Relations ---------------------------------------
export interface ICreateRelation {
    type: typeof CREATE_RELATION,
    payload: TRelation
}
export interface IUpdateRelation {
    type: typeof UPDATE_RELATION,
    payload: TRelation
}
export interface IDeleteRelation {
    type: typeof DELETE_RELATION,
    payload: number
}
export interface IGetRelations {
    type: typeof GET_RELATIONS,
    payload: TRelation[]
}


export interface IGetLinks {
    type: typeof GET_LINKS,
    payload: {}
}
export interface IAddLink {
    type: typeof ADD_LINK,
    payload: {}
}

export type relationDispatchTypes = TCreateAlert | IAddLink | IGetLinks | IUpdateRelation | IGetRelations | ICreateRelation | IDeleteRelation 
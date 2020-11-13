
export const CREATE_RELATION = 'CREATE_RELATION'
export const DELETE_RELATION = 'DELETE_RELATION'
export const GET_TEXTS_RELATIONS = 'GET_TEXTS_RELATIONS'
export const GET_RELATIONS = 'GET_RELATIONS'

export const GET_OBJECTS_RELATIONS = 'GET_OBJECTS_RELATIONS'
export const CREATE_OBJECT_RELATION = 'CREATE_OBJECT_RELATION'
export const DELETE_OBJECT_RELATION = 'DELETE_OBJECT_RELATION'

export const GET_CLASS_RELATIONS = 'GET_CLASS_RELATIONS'
export const CREATE_CLASS_RELATION = 'CREATE_CLASS_RELATION'
export const DELETE_CLASS_RELATION = 'DELETE_CLASS_RELATION'


export type TRelation = {
    id?: number,
    name: string
}

export type TEntityRelation = {
    id?: number,
    parent: number,
    child: number,
    relation: number
}


//Relations ---------------------------------------
export interface ICreateRelation {
    type: typeof CREATE_RELATION,
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
export interface IGetTextsRelations {
    type: typeof GET_TEXTS_RELATIONS,
    payload: TRelation[]
}

//Object relations-----------------------------------
export interface ICreateObjectRelation {
    type: typeof CREATE_OBJECT_RELATION,
    payload: TEntityRelation
}
export interface IDeleteObjectRelation {
    type: typeof DELETE_OBJECT_RELATION,
    payload: number
}
export interface IGetObjectsRelations {
    type: typeof GET_OBJECTS_RELATIONS,
    payload: TEntityRelation[]
}

//Class relations-----------------------------------
export interface ICreateClassRelation {
    type: typeof CREATE_CLASS_RELATION,
    payload: TEntityRelation
}
export interface IDeleteClassRelation {
    type: typeof DELETE_CLASS_RELATION,
    payload: number
}
export interface IGetClassesRelations {
    type: typeof GET_CLASS_RELATIONS,
    payload: TEntityRelation[]
}




export type relationDispatchTypes = IGetRelations | ICreateObjectRelation | IDeleteObjectRelation | IGetObjectsRelations | ICreateClassRelation | IDeleteClassRelation | IGetClassesRelations | ICreateRelation | IDeleteRelation | IGetTextsRelations | IGetObjectsRelations
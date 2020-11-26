import { TAuthor } from "../authors/types"
import { TClass } from "../classes/types"
import { TObject } from "../objects/types"
import { TPlace } from "../places/types"
import { TResource } from "../resourses/types"
import { TCreateAlert } from '../../alerts/types'

export const GET_CORPUSES = 'GET_CORPUSES'
export const UPDATE_CORPUS = 'UPDATE_CORPUS'

export const CREATE_CORPUS = 'CREATE_CORPUS'
export const DELETE_CORPUS = 'DELETE_CORPUS'

export const GET_CORPUS_RESOURCES = 'GET_CORPUS_RESOURCES'
export const GET_CORPUS_AUTHORS = 'GET_CORPUS_AUTHORS'
export const GET_CORPUS_PLACES = 'GET_CORPUS_PLACES'
export const GET_CORPUS_OBJECTS = 'GET_CORPUS_OBJECTS'
export const GET_CORPUS_CLASSES = 'GET_CORPUS_CLASSES'

export const ADD_CORPUS_AUTHOR = 'ADD_CORPUS_AUTHOR'
export const ADD_CORPUS_PLACE = 'ADD_CORPUS_PLACE'
export const DELETE_CORPUS_AUTHOR = 'DELETE_CORPUS_AUTHOR'
export const DELETE_CORPUS_PLACE = 'DELETE_CORPUS_PLACE'


export type TCorpus = {
    id?: number,
    parent: number,
    name: string,
    language: string,
    dialect: string,
    extras: string,
}

export interface ICreateCorpus {
    type: typeof CREATE_CORPUS,
    payload: TCorpus
}
export interface IDeleteCorpus {
    type: typeof DELETE_CORPUS,
    payload: number
}
export interface IUpdateCorpus {
    type: typeof UPDATE_CORPUS,
    payload: TCorpus
}
export interface IGetCorpuses {
    type: typeof GET_CORPUSES,
    payload: TCorpus[]
}

//-----------------------------------------------------
export interface IGetCorpusResources {
    type: typeof GET_CORPUS_RESOURCES,
    payload: TResource[]
}
export interface IGetCorpusAuthors {
    type: typeof GET_CORPUS_AUTHORS,
    payload: TAuthor[]
}
export interface IGetCorpusPlaces {
    type: typeof GET_CORPUS_PLACES,
    payload: TPlace[]
}
export interface IGetCorpusObjects {
    type: typeof GET_CORPUS_OBJECTS,
    payload: TObject[]
}
export interface IGetCorpusClasses {
    type: typeof GET_CORPUS_CLASSES,
    payload: TClass[]
}

//----------------------------------------------------
export interface IAddCorpusAuthor {
    type: typeof ADD_CORPUS_AUTHOR,
    payload: TAuthor
}
export interface IAddCorpusPlace {
    type: typeof ADD_CORPUS_PLACE,
    payload: TPlace
}
export interface IDeleteCorpusAuthor {
    type: typeof DELETE_CORPUS_AUTHOR,
    payload: number
}
export interface IDeleteCorpusPlace {
    type: typeof DELETE_CORPUS_PLACE,
    payload: number
}
export type corpusDispatchTypes = TCreateAlert | IDeleteCorpusAuthor | IDeleteCorpusPlace | IAddCorpusPlace | IAddCorpusAuthor | IGetCorpusAuthors | IGetCorpusClasses | IGetCorpusObjects | IGetCorpusPlaces | IGetCorpusResources | IGetCorpuses | IUpdateCorpus | IDeleteCorpus | ICreateCorpus


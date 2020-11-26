export const GET_AUTHORS = 'GET_AUTHORS'
export const GET_AUTHOR = 'GET_AUTHOR'

export const DELETE_AUTHOR = 'DELETE_AUTHOR'
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR'
export const CREATE_AUTHOR = 'CREATE_AUTHOR'
import { TCreateAlert } from '../../alerts/types'


export type TAuthor = {
    id?: number,
    name: string,
    surname: string,
    patronymic: string,
    initials: string,
    date_of_birth: string,
    date_of_death: string,
    place_of_birth: number,
    picture: string,
}

export interface ICreateAuthor {
    type: typeof CREATE_AUTHOR,
    payload: TAuthor
}
export interface IDeleteAuthor {
    type: typeof DELETE_AUTHOR,
    payload: number
}
export interface IUpdateAuthor {
    type: typeof UPDATE_AUTHOR,
    payload: TAuthor
}
export interface IGetAuthor {
    type: typeof GET_AUTHOR,
    payload: TAuthor
}
export interface IGetAuthors {
    type: typeof GET_AUTHORS,
    payload: TAuthor[]
}

export type authorDispatchTypes = TCreateAlert | IGetAuthors | IGetAuthor | IUpdateAuthor | IDeleteAuthor | ICreateAuthor
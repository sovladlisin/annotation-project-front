export const GET_PLACES = 'GET_PLACES'
export const UPDATE_PLACE = 'UPDATE_PLACE'

export const CREATE_PLACE = 'CREATE_PLACE'
export const DELETE_PLACE= 'DELETE_PLACE'

export type TPlace = {
    id?:number,
    name:string,
    location:string,
}

export interface ICreatePlace {
    type: typeof CREATE_PLACE,
    payload: TPlace
}
export interface IDeletePlace {
    type: typeof DELETE_PLACE,
    payload: number
}
export interface IUpdatePlace {
    type: typeof UPDATE_PLACE,
    payload: TPlace
}
export interface IGetPlaces{
    type: typeof GET_PLACES,
    payload: TPlace[]
}

export type placeDispatchTypes = IGetPlaces|IUpdatePlace|IDeletePlace|ICreatePlace


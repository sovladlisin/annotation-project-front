export const CREATE_WINDOW = 'CREATE_WINDOW'
export const CLOSE_WINDOW = 'CLOSE_WINDOW'

export const OPEN_WINDOW = 'OPEN_WINDOW'
export const COLLAPSE_WINDOW = 'COLLAPSE_WINDOW'

export type TWindow = {
    id: number,
    title: string,
    model_name: string,
    model_pk: number,
    is_hidden: boolean
}

export interface ICreateWindow {
    type: typeof CREATE_WINDOW
    payload: TWindow
}

export interface IOpenWindow {
    type: typeof OPEN_WINDOW,
    payload: number
}
export interface ICloseWindow {
    type: typeof CLOSE_WINDOW,
    payload: number
}
export interface ICollapseWindow {
    type: typeof COLLAPSE_WINDOW,
    payload: number
}
export type windowDispatchTypes = ICreateWindow | IOpenWindow |  ICloseWindow | ICollapseWindow
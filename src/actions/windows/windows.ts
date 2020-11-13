import { Dispatch } from "react";
import { CLOSE_WINDOW, COLLAPSE_WINDOW, CREATE_WINDOW, OPEN_WINDOW, TWindow, windowDispatchTypes } from "./types";

export const createWindow = (window: TWindow) => (dispatch: Dispatch<windowDispatchTypes>) => {
    dispatch({
        type: CREATE_WINDOW,
        payload: window
    })
}

export const openWindow = (id: number) => (dispatch: Dispatch<windowDispatchTypes>, getState) => {
    dispatch({
        type: OPEN_WINDOW,
        payload: id
    })
}

export const closeWindow = (id: number) => (dispatch: Dispatch<windowDispatchTypes>) => {
    dispatch({
        type: CLOSE_WINDOW,
        payload: id
    })
}

export const collapseWindow = (id: number) => (dispatch: Dispatch<windowDispatchTypes>) => {
    dispatch({
        type: COLLAPSE_WINDOW,
        payload: id
    })
}
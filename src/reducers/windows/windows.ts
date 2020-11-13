import { LOGIN_SUCCESS, LOGIN_FAIL, TUserInfo, authDispatchTypes } from "../../actions/auth/types"
import { CLOSE_WINDOW, COLLAPSE_WINDOW, CREATE_WINDOW, OPEN_WINDOW, TWindow, windowDispatchTypes } from "../../actions/windows/types";

interface IDefaultState {
    windows: { [id: number]: TWindow },
}
const defaultState: IDefaultState = {
    windows: {}
}

const windowReducer = (state: IDefaultState = defaultState, action: windowDispatchTypes): IDefaultState => {
    switch (action.type) {
        case CREATE_WINDOW:
            var new_windows = { ...state.windows }
            var check = false
            Object.keys(new_windows).map(key => {
                if (new_windows[key] === undefined) return 0
                if (new_windows[key].model_pk === action.payload.model_pk && new_windows[key].model_name === action.payload.model_name)
                    check = true
            })
            if (check) return { ...state }
            if (new_windows.hasOwnProperty(action.payload.id) && new_windows[action.payload.id] === undefined)
                new_windows[action.payload.id] = action.payload
            else
                new_windows[action.payload.id] = action.payload

            return {
                windows: new_windows
            }
        case CLOSE_WINDOW:
            var new_windows = { ...state.windows }
            new_windows[action.payload] = undefined
            return {
                windows: new_windows
            }
        case OPEN_WINDOW:
            var new_windows = { ...state.windows }
            var temp = new_windows[action.payload]
            temp.is_hidden = false
            new_windows[action.payload] = temp
            return {
                windows: new_windows
            }
        case COLLAPSE_WINDOW:
            var new_windows = { ...state.windows }
            var temp = new_windows[action.payload]
            temp.is_hidden = true
            new_windows[action.payload] = temp
            return {
                windows: new_windows
            }

        default:
            return state;
    }
}

export default windowReducer
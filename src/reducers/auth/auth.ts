import { LOGIN_SUCCESS, LOGIN_FAIL, TUserInfo, authDispatchTypes, LOGOUT } from "../../actions/auth/types"

interface IDefaultState {
    user: TUserInfo
}
const defaultState: IDefaultState = {
    user: {
        token: '',
        active: false,
        user: null
    }
}

const authReducer = (state: IDefaultState = defaultState, action: authDispatchTypes): IDefaultState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT:
            return defaultState
        case LOGIN_FAIL:
            return defaultState
        default:
            return state;
    }
}

export default authReducer
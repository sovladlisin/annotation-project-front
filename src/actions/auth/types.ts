export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'

export type TUser = {
    email: string,
    id: number,
    username: string
}

export type TUserInfo = {
    active: boolean,
    token: string,
    user: TUser
}

export interface ILoginSuccess {
    type: typeof LOGIN_SUCCESS
    payload: TUserInfo
}

export interface ILoginFail {
    type: typeof LOGIN_FAIL
}

export interface ILogout {
    type: typeof LOGOUT
}

export type authDispatchTypes = ILoginSuccess | ILoginFail |ILogout
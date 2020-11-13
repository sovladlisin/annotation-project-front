import axios from 'axios';
import { Dispatch } from 'react';
import { SERVER_URL } from '../../utils';
import { authDispatchTypes, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './types';

// // CHECK TOKEN & LOAD USER
// export const loadUser = () => (dispatch, getState) => {
//     axios
//         .get(SERVER_URL + 'api/auth/user', tokenConfig(getState))
//         .then((res) => {
//             dispatch({
//                 type: USER_LOADED,
//                 payload: res.data,
//             });
//         })
//         .catch((err) => {
//             dispatch({
//                 type: AUTH_ERROR,
//             });
//         });
// };

// LOGIN USER
export const login = (username: string, password: string) => (dispatch: Dispatch<authDispatchTypes>) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ username, password });

    axios
        .post(SERVER_URL + 'api/auth/login', body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            console.log(res)
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_FAIL,
            });
            console.log(err)
        });
};

// REGISTER USER
export const register = ({ username, password, email }) => (dispatch: Dispatch<authDispatchTypes>) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request Body
    const body = JSON.stringify({ username, email, password });

    axios
        .post(SERVER_URL + 'api/auth/register', body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_FAIL,
            });
        });
};

// LOGOUT USER
export const logout = () => (dispatch: Dispatch<authDispatchTypes>, getState) => {
    axios
        .post(SERVER_URL + 'api/auth/logout/', null, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: LOGOUT,
            });
        })
        .catch((err) => {
        });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
};
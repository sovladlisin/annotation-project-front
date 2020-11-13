import axios from 'axios';
import { Dispatch } from 'react';
import { SERVER_URL } from '../../../utils';
import { tokenConfig } from '../../auth/auth';
import { authorDispatchTypes, CREATE_AUTHOR, DELETE_AUTHOR, GET_AUTHOR, GET_AUTHORS, TAuthor, UPDATE_AUTHOR } from './types';

const action_name = "Автор"

//GET AUTHORS
export const getAuthors = () => (dispatch: Dispatch<authorDispatchTypes>, getState) => {
    axios.get(SERVER_URL + 'api/author/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_AUTHORS,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

//GET AUTHOR
export const getAuthor = (id: number) => (dispatch: Dispatch<authorDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/author/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_AUTHOR,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}


//UPDATE AUTHOR
export const updateAuthor = (author: TAuthor) => (dispatch: Dispatch<authorDispatchTypes>, getState) => {
    const body = JSON.stringify(author)

    axios.put(SERVER_URL + `api/author/${author.id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_AUTHOR,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

//CREATE AUTHOR
export const createAuthor = (author: TAuthor) => (dispatch: Dispatch<authorDispatchTypes>, getState) => {
    const body = JSON.stringify(author)
    axios.post(SERVER_URL + `api/author/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_AUTHOR,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)

    });
}

//DELETE AUTHOR
export const deleteAuthor = (id: number) => (dispatch: Dispatch<authorDispatchTypes>, getState) => {
    axios
        .delete(SERVER_URL + `api/author/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_AUTHOR,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

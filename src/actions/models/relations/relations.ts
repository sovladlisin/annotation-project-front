import axios from 'axios';

import { Dispatch } from "react";
import { handleError, SERVER_URL } from "../../../utils";
import { CREATE_ALERT } from '../../alerts/types';
import { tokenConfig } from "../../auth/auth";
import { GET_LINKS, CREATE_RELATION, DELETE_RELATION, GET_RELATIONS, relationDispatchTypes, TRelation, UPDATE_RELATION, TNewLink, ADD_LINK } from "./types";

//GET RELATIONS
export const getRelations = () => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/relation/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_RELATIONS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

//DELETE RELATION
export const deleteRelation = (id: number) => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    axios.delete(SERVER_URL + `api/relation/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_RELATION,
                payload: id,
            });
        })
        .catch((err) => {
            dispatch({
                type: CREATE_ALERT,
                payload: handleError(err)
            })
        });
}

//CREATE RELATION
export const createRelation = (relation: TRelation) => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    const body = JSON.stringify(relation)
    axios.post(SERVER_URL + `api/relation/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_RELATION,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

//CREATE RELATION
export const updateRelation = (relation: TRelation) => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    const body = JSON.stringify(relation)
    axios.put(SERVER_URL + `api/relation/${relation.id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_RELATION,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

// //GET RELATIONS FROM TEXT // objects = objects_ids
// export const getTextRelations = (objects) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
//     axios.get(SERVER_URL + `api/relation/`, tokenConfig(getState)).then(res => {
//         dispatch({
//             type: GET_TEXTS_RELATIONS,
//             payload: res.data.filter(item => objects.includes(item.parent) && objects.includes(item.child))
//         });
//     }).catch((err) => {
//         dispatch({
//     });
// }


export const getLinks = (model_pk: number, model_name: string) => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    const body = JSON.stringify({ model_pk: model_pk, model_name: model_name })
    axios.post(SERVER_URL + `api/getLinks`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_LINKS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

export const addLink = (new_link: TNewLink) => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    const body = JSON.stringify(new_link)
    axios.post(SERVER_URL + `api/addLink`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: ADD_LINK,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

export const deleteLink = (id: number) => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    axios.delete(SERVER_URL + `api/link/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: ADD_LINK,
            payload: { id: id }
        })
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

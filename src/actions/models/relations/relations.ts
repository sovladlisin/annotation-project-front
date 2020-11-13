import axios from 'axios';

import { Dispatch } from "react";
import { SERVER_URL } from "../../../utils";
import { tokenConfig } from "../../auth/auth";
import { CREATE_CLASS_RELATION, CREATE_OBJECT_RELATION, CREATE_RELATION, DELETE_CLASS_RELATION, DELETE_OBJECT_RELATION, DELETE_RELATION, GET_CLASS_RELATIONS, GET_OBJECTS_RELATIONS, GET_RELATIONS, relationDispatchTypes, TEntityRelation, TRelation } from "./types";

//GET RELATIONS
export const getRelations = () => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/relation/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_RELATIONS,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
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
            console.log(err)
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
        console.log(err)
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
//         console.log(err)
//     });
// }

// ----------------------Object relations ------------------------//

export const createObjectRelation = (relation: TEntityRelation) => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    const body = JSON.stringify(relation)
    axios.post(SERVER_URL + `api/objectRelation/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_OBJECT_RELATION,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

export const getObjectRelation = () => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/objectRelation/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_OBJECTS_RELATIONS,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

export const deleteObjectRelation = (id: number) => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    axios.delete(SERVER_URL + `api/objectRelation/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_OBJECT_RELATION,
            payload: id
        });
    }).catch((err) => {
        console.log(err)
    });
}


// ----------------------Class relations ------------------------//

export const createClassRelation = (relation: TEntityRelation) => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    const body = JSON.stringify(relation)
    axios.post(SERVER_URL + `api/classRelation/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_CLASS_RELATION,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

export const getClassRelation = () => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/classRelation/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_CLASS_RELATIONS,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

export const deleteClassRelation = (id: number) => (dispatch: Dispatch<relationDispatchTypes>, getState) => {
    axios.delete(SERVER_URL + `api/classRelation/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_CLASS_RELATION,
            payload: id
        });
    }).catch((err) => {
        console.log(err)
    });
}



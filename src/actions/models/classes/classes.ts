import axios from 'axios';

import { Dispatch } from 'react';
import { classDispatchTypes, CREATE_CLASS, CREATE_CLASS_ATTRIBUTE, DELETE_CLASS, DELETE_CLASS_ATTRIBUTE, GET_CLASSES, GET_CLASS_ATTRIBUTES, TClass, TClassAttribute, UPDATE_CLASS, UPDATE_CLASS_ATTRIBUTE } from './types';
import { tokenConfig } from '../../auth/auth';
import { SERVER_URL } from '../../../utils';
import { GET_AUTHORS } from '../authors/types';

const action_name = "Класс"

//GET CLASSES
export const getClasses = () => (dispatch: Dispatch<classDispatchTypes>, getState) => {
    axios.get(SERVER_URL + 'api/class/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_CLASSES,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

//UPDATE CLASS
export const updateClass = (obj: TClass) => (dispatch, getState) => {
    const body = JSON.stringify(obj)

    axios.put(SERVER_URL + `api/class/${obj.id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_CLASS,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)

    });
}

//CREATE CLASS
export const createClass = (obj: TClass) => (dispatch, getState) => {
    const body = JSON.stringify(obj)
    axios.post(SERVER_URL + `api/class/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_CLASS,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)

    });
}

//DELETE CLASS
export const deleteClass = (id: number) => (dispatch, getState) => {
    axios
        .delete(SERVER_URL + `api/class/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_CLASS,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};


// Attributes ===============================


//GET CLASSES
export const getClassAttributes = (class_id: number) => (dispatch: Dispatch<classDispatchTypes>, getState) => {
    axios.get(SERVER_URL + 'api/classAttributes/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_CLASS_ATTRIBUTES,
            payload: res.data.filter(attr => attr.related_class === class_id)
        });
    }).catch((err) => {
        console.log(err)
    });
}

//UPDATE CLASS
export const updateClassAttribute = (obj: TClassAttribute) => (dispatch, getState) => {
    const body = JSON.stringify(obj)

    axios.put(SERVER_URL + `api/classAttributes/${obj.id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_CLASS_ATTRIBUTE,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)

    });
}

//CREATE CLASS
export const createClassAttribute = (obj: TClassAttribute) => (dispatch, getState) => {
    const body = JSON.stringify(obj)
    axios.post(SERVER_URL + `api/classAttributes/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_CLASS_ATTRIBUTE,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)

    });
}

//DELETE CLASS
export const deleteClassAttribute = (id: number) => (dispatch, getState) => {
    axios
        .delete(SERVER_URL + `api/classAttributes/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_CLASS_ATTRIBUTE,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};
import axios from 'axios';
import { Dispatch } from 'react';
import { SERVER_URL } from '../../../utils';
import { tokenConfig } from '../../auth/auth';
import { CREATE_ENTITY, CREATE_MARKUP, CREATE_OBJECT, CREATE_OBJECT_ATTRIBUTE, DELETE_ENTITY, DELETE_MARKUP, DELETE_OBJECT, GET_MARKUPS_ENTITIES, GET_OBJECTS, GET_OBJECTS_ENTITIES, GET_OBJECT_ATTRIBUTES, GET_TEXTS_MARKUPS, objectDispatchTypes, TEntity, TMarkup, TObject, TObjectAttributeValue, UPDATE_OBJECT, UPDATE_OBJECT_ATTRIBUTE } from './types';


const action_name = "Объект"



//GET OBJECTS
export const getObjects = () => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    axios.get(SERVER_URL + 'api/object/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_OBJECTS,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

//CREATE ENTITY
export const createEntity = (entity: TEntity) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    const body = JSON.stringify(entity)
    axios.post(SERVER_URL + `api/entity/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_ENTITY,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

//DELETE ENTITY
export const deleteEntity = (id: number) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    axios.delete(SERVER_URL + `api/entity/${id}`, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_ENTITY,
            payload: id
        });
    }).catch((err) => {
        console.log(err)
    });
}

//CREATE MARKUP
export const createMarkup = (markup: TMarkup) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    const body = JSON.stringify(markup)

    axios.post(SERVER_URL + `api/markup/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_MARKUP,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

//GET MARKUPS FROM TEXT
export const getTextsMarkups = (text_id: number) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/markup/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_TEXTS_MARKUPS,
            payload: res.data.filter(item => item.text == text_id)
        });
    })
}

//GET MARKUP ENTITIES
export const getMarkupsEntites = (id: number) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/entity/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_MARKUPS_ENTITIES,
            payload: res.data.filter(item => item.markup == id)
        });
    }).catch((err) => {
        console.log(err)
    });

}


//GET ENTITIES FROM OBJECT
export const getObjectsEntities = object_id => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/entity/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_OBJECTS_ENTITIES,
            payload: res.data.filter(item => item.obj == object_id)
        });
    }).catch((err) => {
        console.log(err)
    });
}

//UPDATE OBJECT
export const updateObject = (obj: TObject) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    const body = JSON.stringify(obj)

    axios.put(SERVER_URL + `api/object/${obj.id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_OBJECT,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

//CREATE OBJECT
export const createObject = (obj: TObject) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    const body = JSON.stringify(obj)
    axios.post(SERVER_URL + `api/object/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_OBJECT,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}


//DELETE OBJECT
export const deleteObject = (id: number) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    axios
        .delete(SERVER_URL + `api/object/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_OBJECT,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

//DELETE MARKUP
export const deleteMarkup = (id: number) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    axios
        .delete(SERVER_URL + `api/markup/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_MARKUP,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};


// Attributes ============================

export const updateObjectAttributeValue = (attr: TObjectAttributeValue) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    const body = JSON.stringify(attr)

    axios
        .put(SERVER_URL + `api/objectAttributeValue/${attr.id}/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: UPDATE_OBJECT_ATTRIBUTE,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const createObjectAttributeValue = (attr: TObjectAttributeValue) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    const body = JSON.stringify(attr)

    axios
        .post(SERVER_URL + `api/objectAttributeValue/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: CREATE_OBJECT_ATTRIBUTE,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const getObjectAttributeValues = (id: number) => (dispatch: Dispatch<objectDispatchTypes>, getState) => {
    axios
        .get(SERVER_URL + `api/objectAttributeValue/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_OBJECT_ATTRIBUTES,
                payload: res.data.filter(attr => attr.related_object === id),
            });
        })
        .catch((err) => console.log(err));
};


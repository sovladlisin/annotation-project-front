import axios from 'axios';

import { Dispatch } from 'react';
import { TComment } from '../../../components/layout/CommentaryInfo';
import { handleError, SERVER_URL } from '../../../utils';
import { CREATE_ALERT } from '../../alerts/types';
import { tokenConfig } from '../../auth/auth';
import { resourceDispatchTypes, GET_RESOURCES, CREATE_RESOURCE, DELETE_RESOURCE, UPDATE_RESOURCE, GET_RESOURCE, GET_RESOURCE_TYPES, TResourceType, TResource, GET_RESOURCE_WORKSPACE, CREATE_RESOURCE_TYPE, UPDATE_RESOURCE_TYPE, DELETE_RESOURCE_TYPE, GET_RESOURCE_TEXTS, GET_MARKUPS, TMarkup, DELETE_MARKUP, UPDATE_MARKUP, CREATE_MARKUP, GET_ENTITIES, TEntity, CREATE_ENTITY, DELETE_ENTITY } from './types'

const action_name = "Ресурс"


//GET RESOURCES
export const getResources = () => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    axios.get(SERVER_URL + 'api/resource/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_RESOURCES,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

//GET RESOURCE
export const getResource = (id: number) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/resource/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_RESOURCE,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}


//UPDATE RESOURCE
export const updateResource = (resource: TResource, file: File) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    const body = JSON.stringify(resource)
    axios.put(SERVER_URL + `api/resource/${resource.id}/`, body, tokenConfig(getState)).then(res => {

        dispatch({
            type: UPDATE_RESOURCE,
            payload: res.data
        })
        if (file === null) return null
        const pk = res.data.id
        var formData = new FormData();
        formData.append("attached_file", file);
        axios.post(SERVER_URL + `api/connectFileToResource/${pk}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
            dispatch({
                type: UPDATE_RESOURCE,
                payload: res.data
            })
        }).catch((err) => {
            dispatch({
                type: CREATE_ALERT,
                payload: handleError(err)
            })
        })
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

// //CREATE OBJECT
// export const createResourceType = obj => (dispatch, getState) => {
//     const body = JSON.stringify(obj)
//     axios.post(`api/resourceType/`, body, tokenConfig(getState)).then(res => {
//         dispatch({
//             type: CREATE_RESOURCE_TYPE,
//             payload: res.data
//         });
//     }).catch((err) => {
//         dispatch(returnErrors(err.response.data, err.response.status, action_name));

//     });
// }

//DELETE RESOURCE
export const deleteResource = (id: number) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    axios
        .delete(SERVER_URL + `api/resource/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_RESOURCE,
                payload: id,
            });
        })
        .catch((err) => dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        }));
};

export const testFileUpload = () => {
    var formData = new FormData();
    var imagefile: HTMLInputElement = document.querySelector('#file')
    formData.append("image", imagefile.files[0]);
    // axios.post(SERVER_URL + 'api/uploadFile', formData, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     }
    // })
}

export const createResource = (resource: TResource, file: File) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    var body = JSON.stringify(resource)
    axios.post(SERVER_URL + 'api/resource/', body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_RESOURCE,
            payload: res.data
        })
        if (file === null) return null
        const pk = res.data.id
        var formData = new FormData();
        formData.append("attached_file", file);
        axios.post(SERVER_URL + `api/connectFileToResource/${pk}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
            dispatch({
                type: UPDATE_RESOURCE,
                payload: res.data
            })
        }).catch((err) => {
            dispatch({
                type: CREATE_ALERT,
                payload: handleError(err)
            })
        })

    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

// Resource types

//GET PLACES

export const getResourceTypes = () => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    axios.get(SERVER_URL + 'api/resourceType/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_RESOURCE_TYPES,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

//UPDATE PLACE
export const updateResourceType = (resourceType: TResourceType) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    const body = JSON.stringify(resourceType)
    axios.put(SERVER_URL + `api/resourceType/${resourceType.id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_RESOURCE_TYPE,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

//CREATE PLACE
export const createResourceType = (resourceType: TResourceType) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    const body = JSON.stringify(resourceType)
    axios.post(SERVER_URL + `api/resourceType/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_RESOURCE_TYPE,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })

    });
}

//DELETE PLACE
export const deleteResourceType = (id: number) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    axios
        .delete(SERVER_URL + `api/resourceType/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_RESOURCE_TYPE,
                payload: id,
            });
        })
        .catch((err) => dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        }));
};


//upload docx, pk-corpus_pk
export const uploadDocx = (pk: number, file: File) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    dispatch({
        type: CREATE_ALERT,
        payload: { type: 200, message: 'Выполняется загрузка и обработка текста, пожалуйста подождите' }
    })
    var formData = new FormData();
    formData.append("attached_file", file);
    axios.post(SERVER_URL + `api/uploadDocx/${pk}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 200, message: 'Текст успешно загружен, пожалуйста, обновите страницу' }
        })
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const updateCommentary = (comments: TComment[], resource_pk: number) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    const body = JSON.stringify({ resource_pk, comments })
    axios.post(SERVER_URL + `api/changeComments`, body, tokenConfig(getState)).then(res => {
        console.log(res)
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })

}

export const getResourceTexts = () => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/resourceTexts/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_RESOURCE_TEXTS,
            payload: res.data
        })
    })
}
//============================= MARKUPS

export const getMarkups = () => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/markup/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_MARKUPS,
            payload: res.data
        })
    })
}
export const createMarkup = (markup: TMarkup) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    const body = JSON.stringify(markup)
    axios.post(SERVER_URL + `api/markup/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_MARKUP,
            payload: res.data
        })
    })
}
export const updateMarkup = (markup: TMarkup) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    const body = JSON.stringify(markup)
    axios.put(SERVER_URL + `api/markup/${markup.id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_MARKUP,
            payload: res.data
        })
    })
}
export const deleteMarkup = (id: number) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    axios.delete(SERVER_URL + `api/markup/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_MARKUP,
            payload: id
        })
    })
}

//--------------------------------------------

export const getEntities = () => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/entity/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_ENTITIES,
            payload: res.data
        })
    })
}
export const createEntity = (entity: TEntity) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    const body = JSON.stringify(entity)
    axios.post(SERVER_URL + `api/entity/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_ENTITY,
            payload: res.data
        })
    })
}

export const deleteEntity = (id: number) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    axios.delete(SERVER_URL + `api/entity/${id}/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_ENTITY,
            payload: id
        })
    })
}


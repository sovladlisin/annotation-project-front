import axios from 'axios';

import { Dispatch } from 'react';
import { SERVER_URL } from '../../../utils';
import { tokenConfig } from '../../auth/auth';
import { resourceDispatchTypes, GET_RESOURCES, CREATE_RESOURCE, DELETE_RESOURCE, UPDATE_RESOURCE, GET_RESOURCE, GET_RESOURCE_TYPES, TResourceType, TResource, GET_RESOURCE_WORKSPACE } from './types'

const action_name = "Ресурс"


//GET RESOURCES
export const getResources = () => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    axios.get(SERVER_URL + 'api/resource/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_RESOURCES,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
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
        console.log(err)
    });
}

export const getResourceTypes = () => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    axios.get(SERVER_URL + 'api/resourceType/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_RESOURCE_TYPES,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

export const getResourceWorkspace = id => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {

    var parents, children = []
    var result = {}

    axios.get(SERVER_URL + `api/textToText/`, tokenConfig(getState)).then(res => {
        parents = res.data.filter(item => item.translated == id).map(item => item.original)
        children = res.data.filter(item => item.original == id).map(item => item.translated)

        if (parents === undefined || parents.length == 0) {
            if (children === undefined || children.length == 0) {
                dispatch({
                    type: GET_RESOURCE_WORKSPACE,
                    payload: result
                });
            }
            else { //has a translated version
                axios.get(SERVER_URL + `api/resource/${id}/`, tokenConfig(getState)).then(res => {
                    result['original'] = res.data
                    axios.get(SERVER_URL + `api/resource/${children[0]}/`, tokenConfig(getState)).then(res => {
                        result['translated'] = res.data
                        dispatch({
                            type: GET_RESOURCE_WORKSPACE,
                            payload: result
                        });
                    }).catch((err) => {
                        console.log(err)
                    });
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
        else { // has an original
            axios.get(SERVER_URL + `api/resource/${id}/`, tokenConfig(getState)).then(res => {
                result['translated'] = res.data
                axios.get(SERVER_URL + `api/resource/${parents[0]}/`, tokenConfig(getState)).then(res => {
                    result['original'] = res.data
                    dispatch({
                        type: GET_RESOURCE_WORKSPACE,
                        payload: result
                    });
                }).catch((err) => {
                    console.log(err)
                });
            }).catch((err) => {
                console.log(err)
            });
        }
    }).catch((err) => {
        console.log(err)
    })

}

//UPDATE RESOURCE
export const updateResource = (resource: TResource) => (dispatch: Dispatch<resourceDispatchTypes>, getState) => {
    const body = JSON.stringify(resource)

    axios.put(SERVER_URL + `api/resource/${resource.id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_RESOURCE,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
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
        .catch((err) => console.log(err));
};


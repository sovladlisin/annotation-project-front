import axios from 'axios';

import { Dispatch } from 'react';
import { SERVER_URL } from '../../../utils';
import { tokenConfig } from '../../auth/auth';
import { CREATE_PLACE, DELETE_PLACE, GET_PLACES, placeDispatchTypes, TPlace, UPDATE_PLACE } from './types';

const action_name = "Место"


//GET PLACES
export const getPlaces = () => (dispatch: Dispatch<placeDispatchTypes>, getState) => {
    axios.get(SERVER_URL + 'api/place/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_PLACES,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

//UPDATE PLACE
export const updatePlace = (place: TPlace) => (dispatch: Dispatch<placeDispatchTypes>, getState) => {
    const body = JSON.stringify(place)

    axios.put(SERVER_URL + `api/place/${place.id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_PLACE,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

//CREATE PLACE
export const createPlace = obj => (dispatch: Dispatch<placeDispatchTypes>, getState) => {
    const body = JSON.stringify(obj)
    axios.post(SERVER_URL + `api/place/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_PLACE,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)

    });
}

//DELETE PLACE
export const deletePlace = (id) => (dispatch: Dispatch<placeDispatchTypes>, getState) => {
    axios
        .delete(SERVER_URL + `api/place/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_PLACE,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};
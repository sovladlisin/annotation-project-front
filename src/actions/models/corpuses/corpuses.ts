import axios from 'axios';
import { Dispatch } from 'react';
import { handleError, SERVER_URL } from '../../../utils';
import { CREATE_ALERT } from '../../alerts/types';
import { tokenConfig } from '../../auth/auth';
import { TClass } from '../classes/types';
import { ADD_CORPUS_AUTHOR, ADD_CORPUS_PLACE, corpusDispatchTypes, CREATE_CORPUS, DELETE_CORPUS, DELETE_CORPUS_AUTHOR, DELETE_CORPUS_PLACE, GET_CORPUSES, GET_CORPUS_AUTHORS, GET_CORPUS_CLASSES, GET_CORPUS_OBJECTS, GET_CORPUS_PLACES, GET_CORPUS_RESOURCES, TCorpus, UPDATE_CORPUS } from './types';


const action_name = "Корпус"



//GET CORPUSES
export const getCorpuses = () => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    axios.get(SERVER_URL + 'api/corpus/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_CORPUSES,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

//UPDATE CORPUS
export const updateCorpus = (corpus: TCorpus) => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    const body = JSON.stringify(corpus)

    axios.put(SERVER_URL + `api/corpus/${corpus.id}/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_CORPUS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

//GET CORPUS RESOURCES
export const getCorpusResources = (id: number) => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/resource/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_CORPUS_RESOURCES,
            payload: res.data.filter(res => res.corpus === id)
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

//GET CORPUS AUTHORS
export const getCorpusAuthors = (id: number) => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/corpusAuthors/`, tokenConfig(getState)).then(res => {
        var authors_ids = res.data.filter(res => res.corpus === id).map(item => item.author)
        axios.get(SERVER_URL + `api/author/`, tokenConfig(getState)).then(res => {
            dispatch({
                type: GET_CORPUS_AUTHORS,
                payload: res.data.filter(author => authors_ids.includes(author.id))
            });
        }).catch((err) => {
            dispatch({
                type: CREATE_ALERT,
                payload: handleError(err)
            })
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

//GET CORPUS PLACES
export const getCorpusPlaces = (id: number) => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/corpusPlaces/`, tokenConfig(getState)).then(res => {
        var places_ids = res.data.filter(res => res.corpus === id).map(item => item.place)
        axios.get(SERVER_URL + `api/place/`, tokenConfig(getState)).then(res => {
            dispatch({
                type: GET_CORPUS_PLACES,
                payload: res.data.filter(place => places_ids.includes(place.id))
            });
        }).catch((err) => {
            dispatch({
                type: CREATE_ALERT,
                payload: handleError(err)
            })
        });
    }).catch((err) => {

    });
}

//GET CORPUS CLASSES
export const getCorpusClasses = (id: number) => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/class/`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_CORPUS_CLASSES,
            payload: res.data.filter(item => item.corpus == id)
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

//GET CORPUS OBJECTS
export const getCorpusObjects = (id: number) => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/class/`, tokenConfig(getState)).then(res => {
        var classes_id = res.data.filter(item => item.corpus == id).map(item => item.id)
        axios.get(SERVER_URL + `api/object/`, tokenConfig(getState)).then(res => {
            dispatch({
                type: GET_CORPUS_OBJECTS,
                payload: res.data.filter(item => classes_id.includes(item.id))
            });
        }).catch((err) => {
            dispatch({
                type: CREATE_ALERT,
                payload: handleError(err)
            })
        });
    }).catch((err) => {

    });
}

//CREATE AUTHOR
export const createCorpus = (corpus: TCorpus) => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    const body = JSON.stringify(corpus)
    axios.post(SERVER_URL + `api/corpus/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_CORPUS,
            payload: res.data
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

//DELETE CORPUS
export const deleteCorpus = (id: number) => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    axios
        .delete(SERVER_URL + `api/corpus/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_CORPUS,
                payload: id,
            });
        })
        .catch((err) => dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        }));
};

export const addCorpusAuthor = (corpus: number, author: number) => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    const body = JSON.stringify({ corpus: corpus, author: author })
    axios.post(SERVER_URL + `api/corpusAuthors/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: ADD_CORPUS_AUTHOR,
            payload: getState().authors.authors.find(a => a.id === author)
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

export const addCorpusPlace = (corpus: number, place: number) => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    const body = JSON.stringify({ corpus: corpus, place: place })
    axios.post(SERVER_URL + `api/corpusPlaces/`, body, tokenConfig(getState)).then(res => {
        dispatch({
            type: ADD_CORPUS_PLACE,
            payload: getState().places.places.find(a => a.id === place)
        });
    }).catch((err) => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    });
}

export const deleteCorpusAuthor = (corpus: number, author: number) => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/corpusAuthors/`, tokenConfig(getState)).then(res => {
        const id = res.data.find(item => item.corpus === corpus && item.author === author).id
        axios.delete(SERVER_URL + `api/corpusAuthors/${id}/`, tokenConfig(getState)).then((res) => {
            dispatch({
                type: DELETE_CORPUS_AUTHOR,
                payload: author,
            });
        }).catch((err) => dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        }));
    }).catch((err) => dispatch({
        type: CREATE_ALERT,
        payload: handleError(err)
    }))
};

export const deleteCorpusPlace = (corpus: number, place: number) => (dispatch: Dispatch<corpusDispatchTypes>, getState) => {
    axios.get(SERVER_URL + `api/corpusPlaces/`, tokenConfig(getState)).then(res => {
        const id = res.data.find(item => item.corpus === corpus && item.place === place).id
        axios.delete(SERVER_URL + `api/corpusPlaces/${id}/`, tokenConfig(getState)).then((res) => {
            dispatch({
                type: DELETE_CORPUS_PLACE,
                payload: place,
            });
        }).catch((err) => dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        }));
    }).catch((err) => dispatch({
        type: CREATE_ALERT,
        payload: handleError(err)
    }))
};
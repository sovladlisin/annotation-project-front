import { TAuthor } from "../../actions/models/authors/types"
import { TClass } from "../../actions/models/classes/types"
import { GET_CORPUS_PLACES,GET_CORPUS_OBJECTS,GET_CORPUS_CLASSES,GET_CORPUS_AUTHORS,corpusDispatchTypes, CREATE_CORPUS, DELETE_CORPUS, GET_CORPUSES, TCorpus, UPDATE_CORPUS, GET_CORPUS_RESOURCES } from "../../actions/models/corpuses/types"
import { TObject } from "../../actions/models/objects/types"
import { TPlace } from "../../actions/models/places/types"
import { TResource } from "../../actions/models/resourses/types"

interface IDefaultState {
    corpuses: TCorpus[],
    corpus_resources : TResource[],
    corpus_places : TPlace[],
    corpus_classes : TClass[],
    corpus_objects : TObject[],
    corpus_authors : TAuthor[],
}
const defaultState: IDefaultState = {
    corpuses: [],
    corpus_resources: [],
    corpus_places : [],
    corpus_classes : [],
    corpus_objects : [],
    corpus_authors : [],
}

const corpusReducer = (state: IDefaultState = defaultState, action:corpusDispatchTypes ): IDefaultState => {
    switch (action.type) {
        case GET_CORPUSES:
            return {
                ...state,
                corpuses: action.payload
            }
        case DELETE_CORPUS:
            return {
                ...state,
                corpuses: state.corpuses.filter(a => a.id != action.payload)
            }
        case CREATE_CORPUS:
            return{
                ...state,
                corpuses: [...state.corpuses, action.payload]
            }
        case UPDATE_CORPUS:
            return{
                ...state,
                corpuses: state.corpuses.map(i => {return i.id === action.payload.id ? action.payload : i})
            }
        case GET_CORPUS_RESOURCES:
            return{
                ...state,
                corpus_resources: action.payload
            }
        case GET_CORPUS_PLACES:
            return{
                ...state,
                corpus_places: action.payload
            }
        case GET_CORPUS_OBJECTS:
            return{
                ...state,
                corpus_objects: action.payload
            }
        case GET_CORPUS_CLASSES:
            return{
                ...state,
                corpus_classes: action.payload
            }
        case GET_CORPUS_AUTHORS:
            return{
                ...state,
                corpus_authors: action.payload
            }
        default:
            return state;
    }
}

export default corpusReducer
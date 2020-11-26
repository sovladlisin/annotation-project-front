import { CREATE_ENTITY, CREATE_MARKUP, CREATE_RESOURCE, CREATE_RESOURCE_TYPE, DELETE_ENTITY, DELETE_MARKUP, DELETE_RESOURCE, DELETE_RESOURCE_TYPE, GET_ENTITIES, GET_MARKUPS, GET_RESOURCE, GET_RESOURCES, GET_RESOURCE_TEXTS, GET_RESOURCE_TYPES, GET_RESOURCE_WORKSPACE, resourceDispatchTypes, TEntity, TMarkup, TResource, TResourceText, TResourceType, UPDATE_MARKUP, UPDATE_RESOURCE, UPDATE_RESOURCE_TYPE } from "../../actions/models/resourses/types"

interface IDefaultState {
    resources: TResource[],
    resource: TResource,
    types: TResourceType[],
    workspace: object,
    texts: TResourceText[],
    markups: TMarkup[],
    entities: TEntity[]
}
const defaultState: IDefaultState = {
    resources: [],
    types: [],
    workspace: {},
    resource: null,
    texts: [],
    markups: [],
    entities: []
}

const resourceReducer = (state: IDefaultState = defaultState, action: resourceDispatchTypes): IDefaultState => {
    switch (action.type) {
        case GET_RESOURCES:
            return {
                ...state,
                resources: action.payload
            }
        case GET_RESOURCE:
            return {
                ...state,
                resource: action.payload
            }
        case DELETE_RESOURCE:
            return {
                ...state,
                resources: state.resources.filter(a => a.id != action.payload)
            }
        case CREATE_RESOURCE:
            return {
                ...state,
                resources: [...state.resources, action.payload]
            }
        case UPDATE_RESOURCE:
            return {
                ...state,
                resources: state.resources.map(i => { return i.id === action.payload.id ? action.payload : i })
            }
        case GET_RESOURCE_WORKSPACE:
            return {
                ...state,
                workspace: action.payload
            }
        case GET_RESOURCE_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case UPDATE_RESOURCE_TYPE:
            return {
                ...state,
                types: state.types.map(t => t.id === action.payload.id ? action.payload : t)
            }
        case DELETE_RESOURCE_TYPE:
            return {
                ...state,
                types: state.types.filter(t => t.id != action.payload)
            }
        case CREATE_RESOURCE_TYPE:
            return {
                ...state,
                types: [...state.types, action.payload]
            }
        case GET_RESOURCE_TEXTS:
            return {
                ...state,
                texts: action.payload
            }
        case CREATE_MARKUP:
            return {
                ...state,
                markups: [...state.markups, action.payload]
            }
        case UPDATE_MARKUP:
            return {
                ...state,
                markups: state.markups.map(m => m.id === action.payload.id ? action.payload : m)
            }
        case DELETE_MARKUP:
            return {
                ...state,
                markups: state.markups.filter(m => m.id != action.payload)
            }
        case GET_MARKUPS:
            return {
                ...state,
                markups: action.payload
            }
        case CREATE_ENTITY:
            return {
                ...state,
                entities: [...state.entities, action.payload]
            }
        case DELETE_ENTITY:
            return {
                ...state,
                entities: state.entities.filter(e => e.id != action.payload)
            }
        case GET_ENTITIES:
            return {
                ...state,
                entities: action.payload
            }
        default:
            return state;
    }
}

export default resourceReducer
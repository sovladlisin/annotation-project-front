import { CREATE_RESOURCE, DELETE_RESOURCE, GET_RESOURCE, GET_RESOURCES, GET_RESOURCE_TYPES, GET_RESOURCE_WORKSPACE, resourceDispatchTypes, TResource, TResourceType, UPDATE_RESOURCE } from "../../actions/models/resourses/types"

interface IDefaultState {
    resources: TResource[],
    resource: TResource,
    types: TResourceType[],
    workspace: object
}
const defaultState: IDefaultState = {
    resources: [],
    types: [],
    workspace: {},
    resource: null
}

const resourceReducer = (state: IDefaultState = defaultState, action:resourceDispatchTypes ): IDefaultState => {
    switch (action.type) {
        case GET_RESOURCES:
            return {
                ...state,
                resources: action.payload
            }
        case GET_RESOURCE:
            return{
                ...state,
                resource: action.payload
            }
        case DELETE_RESOURCE:
            return {
                ...state,
                resources: state.resources.filter(a => a.id != action.payload)
            }
        case CREATE_RESOURCE:
            return{
                ...state,
                resources: [...state.resources, action.payload]
            }
        case UPDATE_RESOURCE:
            return{
                ...state,
                resources: state.resources.map(i => {return i.id === action.payload.id ? action.payload : i})
            }
        case GET_RESOURCE_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case GET_RESOURCE_WORKSPACE:
            return {
                ...state,
                workspace: action.payload
            }
        default:
            return state;
    }
}

export default resourceReducer
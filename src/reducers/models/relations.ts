import { ADD_LINK, CREATE_RELATION, DELETE_RELATION, GET_LINKS, GET_RELATIONS, relationDispatchTypes, TRelation, UPDATE_RELATION } from "../../actions/models/relations/types"

interface IDefaultState {
    relations: TRelation[],
    links: {},
    new_link: {}


}
const defaultState: IDefaultState = {
    relations: [],
    links: {},
    new_link: {}
}

const relationReducer = (state: IDefaultState = defaultState, action: relationDispatchTypes): IDefaultState => {
    switch (action.type) {
        case CREATE_RELATION:
            return {
                ...state,
                relations: [...state.relations, action.payload]
            }
        case UPDATE_RELATION:
            return {
                ...state,
                relations: state.relations.map(r => r.id === action.payload.id ? action.payload : r)
            }
        case DELETE_RELATION:
            return {
                ...state,
                relations: state.relations.filter(i => i.id != action.payload)
            }
        case GET_RELATIONS:
            return {
                ...state,
                relations: action.payload
            }
        case GET_LINKS:
            return {
                ...state,
                links: action.payload
            }
        case ADD_LINK:
            return {
                ...state,
                new_link: action.payload
            }

        default:
            return state;
    }
}

export default relationReducer
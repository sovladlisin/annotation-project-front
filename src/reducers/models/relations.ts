import { CREATE_CLASS_RELATION, CREATE_OBJECT_RELATION, CREATE_RELATION, DELETE_CLASS_RELATION, DELETE_OBJECT_RELATION, DELETE_RELATION, GET_CLASS_RELATIONS, GET_OBJECTS_RELATIONS, GET_RELATIONS, relationDispatchTypes, TEntityRelation, TRelation } from "../../actions/models/relations/types"

interface IDefaultState {
    relations: TRelation[],

    object_relations: TEntityRelation[],
    class_relations: TEntityRelation[],
}
const defaultState: IDefaultState = {
    relations: [],
    object_relations: [],
    class_relations: []
}

const relationReducer = (state: IDefaultState = defaultState, action: relationDispatchTypes): IDefaultState => {
    switch (action.type) {
        case CREATE_RELATION:
            return {
                ...state,
                relations: [...state.relations, action.payload]
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
        // Objects ------------------------------------------
        case CREATE_OBJECT_RELATION:
            return {
                ...state,
                object_relations: [...state.object_relations, action.payload]
            }
        case DELETE_OBJECT_RELATION:
            return {
                ...state,
                object_relations: state.object_relations.filter(i => i.id != action.payload)
            }
        case GET_OBJECTS_RELATIONS:
            return {
                ...state,
                object_relations: action.payload
            }
        // Classes ------------------------------------------
        case CREATE_CLASS_RELATION:
            return {
                ...state,
                class_relations: [...state.class_relations, action.payload]
            }
        case DELETE_CLASS_RELATION:
            return {
                ...state,
                class_relations: state.class_relations.filter(i => i.id != action.payload)
            }
        case GET_CLASS_RELATIONS:
            return {
                ...state,
                class_relations: action.payload
            }

        default:
            return state;
    }
}

export default relationReducer
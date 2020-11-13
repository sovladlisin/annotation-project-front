import { classDispatchTypes, CREATE_CLASS, CREATE_CLASS_ATTRIBUTE, DELETE_CLASS, DELETE_CLASS_ATTRIBUTE, GET_CLASSES, GET_CLASS_ATTRIBUTES, TClass, TClassAttribute, UPDATE_CLASS, UPDATE_CLASS_ATTRIBUTE } from "../../actions/models/classes/types";

interface IDefaultState {
    classes: TClass[],
    attributes: TClassAttribute[]
}
const defaultState: IDefaultState = {
    classes: [],
    attributes: []
}

const classReducer = (state: IDefaultState = defaultState, action: classDispatchTypes): IDefaultState => {
    switch (action.type) {
        case GET_CLASSES:
            return {
                ...state,
                classes: action.payload
            }
        case DELETE_CLASS:
            return {
                ...state,
                classes: state.classes.filter(a => a.id != action.payload)
            }
        case CREATE_CLASS:
            return {
                ...state,
                classes: [...state.classes, action.payload]
            }
        case UPDATE_CLASS:
            return {
                ...state,
                classes: state.classes.map(i => { return i.id === action.payload.id ? action.payload : i })
            }

        case GET_CLASS_ATTRIBUTES:
            return {
                ...state,
                attributes: action.payload
            }
        case DELETE_CLASS_ATTRIBUTE:
            return {
                ...state,
                attributes: state.attributes.filter(a => a.id != action.payload)
            }
        case CREATE_CLASS_ATTRIBUTE:
            return {
                ...state,
                attributes: [...state.attributes, action.payload]
            }
        case UPDATE_CLASS_ATTRIBUTE:
            return {
                ...state,
                attributes: state.attributes.map(i => { return i.id === action.payload.id ? action.payload : i })
            }
        default:
            return state;
    }
}

export default classReducer
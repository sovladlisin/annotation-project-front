import { CREATE_ENTITY, CREATE_MARKUP, CREATE_OBJECT, DELETE_ENTITY, DELETE_MARKUP, DELETE_OBJECT, GET_MARKUPS_ENTITIES, GET_OBJECTS, GET_OBJECTS_ENTITIES, GET_TEXTS_MARKUPS, objectDispatchTypes, TEntity, TMarkup, TObject, UPDATE_OBJECT, TObjectAttributeValue, DELETE_OBJECT_ATTRIBUTE, GET_OBJECT_ATTRIBUTES, CREATE_OBJECT_ATTRIBUTE, UPDATE_OBJECT_ATTRIBUTE } from "../../actions/models/objects/types"

interface IDefaultState {
    objects: TObject[],
    object_entities: TEntity[],

    text_markups: TMarkup[],
    markup_entities: TEntity[],


    new_entity: TEntity,
    new_markup: TMarkup,


    object_attribute_values: TObjectAttributeValue[]
    new_object_attribute_value: TObjectAttributeValue
}
const defaultState: IDefaultState = {
    objects: [],
    object_entities: [],

    text_markups: [],
    markup_entities: [],


    new_entity: null,
    new_markup: null,


    object_attribute_values: [],
    new_object_attribute_value: null
}

const objectReducer = (state: IDefaultState = defaultState, action: objectDispatchTypes): IDefaultState => {
    switch (action.type) {
        case GET_OBJECTS:
            return {
                ...state,
                objects: action.payload
            }
        case DELETE_OBJECT:
            return {
                ...state,
                objects: state.objects.filter(a => a.id != action.payload)
            }
        case CREATE_OBJECT:
            return {
                ...state,
                objects: [...state.objects, action.payload]
            }
        case UPDATE_OBJECT:
            return {
                ...state,
                objects: state.objects.map(i => { return i.id === action.payload.id ? action.payload : i })
            }
        case GET_OBJECTS_ENTITIES:
            return {
                ...state,
                object_entities: action.payload
            }
        case CREATE_ENTITY:
            return {
                ...state,
                new_entity: action.payload
            }
        case DELETE_ENTITY:
            return {
                ...state,
                object_entities: state.object_entities.filter(e => e.id != action.payload),
                markup_entities: state.markup_entities.filter(e => e.id != action.payload)
            }
        case CREATE_MARKUP:
            return {
                ...state,
                new_markup: action.payload
            }
        case DELETE_MARKUP:
            return {
                ...state,
                text_markups: state.text_markups.filter(m => m.id != action.payload)
            }
        case GET_TEXTS_MARKUPS:
            return {
                ...state,
                text_markups: action.payload
            }
        case GET_MARKUPS_ENTITIES:
            return {
                ...state,
                markup_entities: action.payload
            }
        case GET_OBJECT_ATTRIBUTES:
            return {
                ...state,
                object_attribute_values: action.payload
            }
        case UPDATE_OBJECT_ATTRIBUTE:
            return {
                ...state,
                new_object_attribute_value: action.payload
            }
        case CREATE_OBJECT_ATTRIBUTE:
            return {
                ...state,
                new_object_attribute_value: action.payload
            }

        default:
            return state;
    }
}

export default objectReducer
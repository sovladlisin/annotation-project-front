import { CREATE_PLACE, DELETE_PLACE, GET_PLACES, placeDispatchTypes, TPlace, UPDATE_PLACE } from "../../actions/models/places/types"

interface IDefaultState {
    places: TPlace[]
}
const defaultState: IDefaultState = {
    places: []
}

const placeReducer = (state: IDefaultState = defaultState, action:placeDispatchTypes ): IDefaultState => {
    switch (action.type) {
        case GET_PLACES:
            return {
                places: action.payload
            }
        case DELETE_PLACE:
            return {
                places: state.places.filter(a => a.id != action.payload)
            }
        case CREATE_PLACE:
            return{
                places: [...state.places, action.payload]
            }
        case UPDATE_PLACE:
            return{
                places: state.places.map(i => {return i.id === action.payload.id ? action.payload : i})
            }
        default:
            return state;
    }
}

export default placeReducer
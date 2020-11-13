import { authorDispatchTypes, CREATE_AUTHOR, DELETE_AUTHOR, GET_AUTHORS, TAuthor, UPDATE_AUTHOR } from "../../actions/models/authors/types";

interface IDefaultState {
    authors: TAuthor[],
}
const defaultState: IDefaultState = {
    authors: []
}

const authorReducer = (state: IDefaultState = defaultState, action:authorDispatchTypes ): IDefaultState => {
    switch (action.type) {
        case GET_AUTHORS:
            return {
                authors: action.payload
            }
        case DELETE_AUTHOR:
            return {
                authors: state.authors.filter(a => a.id != action.payload)
            }
        case CREATE_AUTHOR:
            return{
                authors: [...state.authors, action.payload]
            }
        case UPDATE_AUTHOR:
            return{
                authors: state.authors.map(i => {return i.id === action.payload.id ? action.payload : i})
            }
        default:
            return state;
    }
}

export default authorReducer
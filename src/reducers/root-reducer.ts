import { combineReducers } from "redux";
import alertReducer from "./alerts/alerts";
import authReducer from "./auth/auth";
import authorReducer from "./models/authors";
import classReducer from "./models/classes";
import corpusReducer from "./models/corpuses";
import objectReducer from "./models/objects";
import placeReducer from "./models/places";
import resourceReducer from "./models/resources";
import relationReducer from "./models/relations";
import windowReducer from "./windows/windows";


const RootReducer = combineReducers({
    auth: authReducer,
    authors: authorReducer,
    classes: classReducer,
    corpuses: corpusReducer,
    objects: objectReducer,
    places: placeReducer,
    resources: resourceReducer,
    windows: windowReducer,
    relations: relationReducer,
    alerts: alertReducer
});

export default RootReducer
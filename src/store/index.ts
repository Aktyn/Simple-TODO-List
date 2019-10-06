import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import {integrityChecker, storageSaver} from "../middleware";

const store = createStore(rootReducer, applyMiddleware(integrityChecker, storageSaver));
export default store;
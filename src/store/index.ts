import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);
export default store;

store.subscribe(() => {
	//save to local storage
	localStorage.setItem('state', JSON.stringify(store.getState()))
});
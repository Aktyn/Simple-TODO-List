import {Middleware} from 'redux';
import {ACTION, ActionRejectTask, ActionSchema} from "../actions";
import {StateType} from "../reducers";

export const storageSaver: Middleware = (store) => (next) => (action: ActionSchema) => {
	let result = next(action);
	
	if( [ACTION.ADD_TASK, ACTION.DELETE_TASK, ACTION.EDIT_TASK].includes(action.type) ) {
		//save tasks local storage
		let tasks = (store.getState() as StateType).tasks;
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}
	
	return result;
};

export const integrityChecker: Middleware = () => (next) => (action: ActionSchema) => {
	if(action.type === ACTION.ADD_TASK && action.content.length < 1) {
		return next({
			type: ACTION.REJECT_TASK,
			reason: 'One does not simply add task with no content'
		} as ActionRejectTask);
	}
	
	return next(action);
};
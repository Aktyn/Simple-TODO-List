import {ACTION, ActionSchema} from "../actions";

export interface TaskSchema {
	timestamp: number;
	content: string;
}

let saved_tasks = localStorage.getItem('tasks');

const initialState = {
	tasks: (saved_tasks ? JSON.parse(saved_tasks) : []) as TaskSchema[],
	rejected_task_reason: null as (null | string)
};

export type StateType = typeof initialState;

export default function rootReducer(state = initialState, action: ActionSchema): StateType {
	
	switch (action.type) {
		case ACTION.ADD_TASK: return {
			...state,
			rejected_task_reason: null,
			tasks: state.tasks.concat({timestamp: Date.now(), content: action.content})
		};
		case ACTION.DELETE_TASK: return {
			...state,
			tasks: state.tasks.filter((task: TaskSchema) => task.timestamp !== action.timestamp)
		};
		case ACTION.EDIT_TASK: return {
			...state,
			tasks: state.tasks.map(t => {
				if(t.timestamp === action.timestamp)
					t.content = action.content;
				return t;
			})
		};
		case ACTION.REJECT_TASK: return {
			...state,
			rejected_task_reason: action.reason
		};
	}
	
	return state;
}
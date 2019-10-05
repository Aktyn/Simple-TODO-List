import {ACTION, ActionSchema} from "../actions";

export interface TaskSchema {
	timestamp: number;
	content: string;
}

let saved_state = localStorage.getItem('state');

const initialState = saved_state ? JSON.parse(saved_state) : {
	tasks: [] as TaskSchema[]
};

export type StateType = typeof initialState;

export default function rootReducer(state = initialState, action: ActionSchema): StateType {
	
	switch (action.type) {
		case ACTION.ADD_TASK: return {
			...state,
			tasks: [...state.tasks, action.data],
		};
		case ACTION.DELETE_TASK: return {
			...state,
			tasks: state.tasks.filter((task: TaskSchema) => task.timestamp !== action.data.task_timestamp)
		};
	}
	
	return state;
}
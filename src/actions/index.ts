// import {TaskSchema} from "../reducers";

export enum ACTION {
	ADD_TASK,
	DELETE_TASK,
	REJECT_TASK
}

export interface ActionAddTask {
	type: ACTION.ADD_TASK;
	content: string;
}

export interface ActionDeleteTask {
	type: ACTION.DELETE_TASK;
	timestamp: number
}

export interface ActionRejectTask {
	type: ACTION.REJECT_TASK;
	reason: string;
}

export type ActionSchema = ActionAddTask | ActionDeleteTask | ActionRejectTask;
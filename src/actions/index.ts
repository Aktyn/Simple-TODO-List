import {TaskSchema} from "../reducers";

export enum ACTION {
	ADD_TASK = "ADD TASK",
	DELETE_TASK = "DELETE TASK"
}

export interface ActionAddTask {
	type: ACTION.ADD_TASK;
	data: TaskSchema;
}

export interface ActionDeleteTask {
	type: ACTION.DELETE_TASK;
	data: {task_timestamp: number};
}

export type ActionSchema = ActionAddTask | ActionDeleteTask;
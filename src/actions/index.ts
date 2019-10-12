export enum ACTION {
	ADD_TASK,
	DELETE_TASK,
	EDIT_TASK,
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

export interface ActionEditTask {
	type: ACTION.EDIT_TASK;
	timestamp: number;
	content: string;
}

export interface ActionRejectTask {
	type: ACTION.REJECT_TASK;
	reason: string;
}

export type ActionSchema = ActionAddTask | ActionDeleteTask | ActionEditTask | ActionRejectTask;
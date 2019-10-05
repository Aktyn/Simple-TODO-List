import React, {Dispatch} from "react";
import { connect } from "react-redux";
import {StateType, TaskSchema} from "../reducers";
import {ACTION, ActionDeleteTask} from "../actions";

function mapDispatchToProps(dispatch: Dispatch<ActionDeleteTask>) {
	return {
		deleteTask: (task_timestamp: number) => dispatch({type: ACTION.DELETE_TASK, data: {task_timestamp}})
	};
}

const mapStateToProps = (state: StateType) => {
    return { tasks: state.tasks };
};

interface TasksListProps {
	deleteTask(task_timestamp: number): void;
	tasks: TaskSchema[];
}

class TasksList extends React.Component<TasksListProps> {
	private container: HTMLDivElement | null = null;
	
	componentDidUpdate(prevProps: Readonly<TasksListProps>) {
		if(prevProps.tasks.length < this.props.tasks.length && this.container)//task added
			this.container.scrollTo(0, this.container.scrollHeight);
	}
	
	render() {
		return <div className={'tasks-list'} ref={el => this.container = el}>{this.props.tasks.map(task => (
			<div key={task.timestamp}>
				<h6 style={{
					margin: '4px 0px',
					textAlign: 'left'
				}}>Added: {new Date(task.timestamp).toLocaleString()}</h6>
				<span>{task.content}</span>
				<button className={'delete-btn'}
				        onClick={() => this.props.deleteTask(task.timestamp)}>DELETE</button>
			</div>
		))}</div>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
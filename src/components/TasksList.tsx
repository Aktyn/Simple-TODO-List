import React from "react";
import { connect } from "react-redux";
import {StateType, TaskSchema} from "../reducers";
import Task from "./Task";

const mapStateToProps = (state: StateType) => {
    return { tasks: state.tasks };
};

interface TasksListProps {
	tasks: TaskSchema[];
}

class TasksList extends React.Component<TasksListProps> {
	private container: HTMLDivElement | null = null;
	
	componentDidUpdate(prevProps: Readonly<TasksListProps>) {
		if(prevProps.tasks.length < this.props.tasks.length && this.container)//task added
			this.container.scrollTo(0, this.container.scrollHeight);
	}
	
	render() {
		return <div className={'tasks-list'} ref={el => this.container = el}>
			{this.props.tasks.map(task => <Task key={task.timestamp} data={task} />)}</div>;
	}
}

export default connect(mapStateToProps)(TasksList);
import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {TaskSchema} from "../reducers";
import {ACTION, ActionAddTask} from "../actions";

function mapDispatchToProps(dispatch: Dispatch<ActionAddTask>) {
	return {
		addTask: (task: TaskSchema) => dispatch({type: ACTION.ADD_TASK, data: task})
	};
}

interface ControlPanelProps {
	addTask(task: TaskSchema): void;
}

class ControlPanel extends React.Component<ControlPanelProps> {
	private task_input: HTMLInputElement | null = null;
	
	private addTask() {
		if (!this.task_input || this.task_input.value.length < 1)
			return;
		
		this.props.addTask({timestamp: Date.now(), content: this.task_input.value});
		
		this.task_input.value = '';
	}
	
	render() {
		return <div>
			<h4>Control panel</h4>
			<p>
				<input type={'text'} ref={el => this.task_input = el} onKeyDown={e => {
					if (e.key.toLowerCase() === 'enter')
						this.addTask();
				}}/>
			</p>
			<button onClick={this.addTask.bind(this)}>ADD TASK</button>
		</div>;
	}
}

export default connect(null, mapDispatchToProps)(ControlPanel);
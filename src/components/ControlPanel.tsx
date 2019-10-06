import React, {Dispatch} from "react";
import {connect} from "react-redux";
import {ACTION, ActionAddTask} from "../actions";
import {StateType} from "../reducers";

function mapDispatchToProps(dispatch: Dispatch<ActionAddTask>) {
	return {
		addTask: (content: string) => dispatch({type: ACTION.ADD_TASK, content})
	};
}

const mapStateToProps = (state: StateType) => {
    return { rejected_task_reason: state.rejected_task_reason };
};

interface ControlPanelProps {
	addTask(content: string): void;
	rejected_task_reason: null | string;
}

const widthStyle = {width: '200px'};

class ControlPanel extends React.Component<ControlPanelProps> {
	private task_input: HTMLInputElement | null = null;
	
	private addTask() {
		if (!this.task_input)
			return;
		
		this.props.addTask(this.task_input.value);
		this.task_input.value = '';
	}
	
	render() {
		return <div>
			<h4>Control panel</h4>
			<div style={{
				color: '#ef5350',
				fontSize: '12px',
				...widthStyle
			}}>{this.props.rejected_task_reason}</div>
			<p>
				<input type={'text'} ref={el => this.task_input = el} onKeyDown={e => {
					if (e.key.toLowerCase() === 'enter')
						this.addTask();
				}} style={widthStyle}/>
			</p>
			<button onClick={this.addTask.bind(this)}>ADD TASK</button>
		</div>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
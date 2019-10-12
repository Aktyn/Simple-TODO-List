import React, {Dispatch} from "react";
import { connect } from "react-redux";
import {ACTION, ActionDeleteTask, ActionEditTask} from "../actions";
import { TaskSchema } from "../reducers";

function mapDispatchToProps(dispatch: Dispatch<ActionDeleteTask | ActionEditTask>) {
	return {
        deleteTask: (timestamp: number) => dispatch({type: ACTION.DELETE_TASK, timestamp}),
        editTask: (content: string, timestamp: number) => 
            dispatch({type: ACTION.EDIT_TASK, content, timestamp})
	};
}

interface TaskProps {
    deleteTask(timestamp: number): void;
    editTask(content: string, timestamp: number): void;
    data: TaskSchema;
}

interface TaskState {
    edit: boolean;
}

export class Task extends React.Component<TaskProps, TaskState> {
    private taskInput: HTMLInputElement | null = null;

    state: TaskState = {
        edit: false
    };

    private renderEditInput() {
        return <>
            <div>
                <input className='task-edit' type='text' defaultValue={this.props.data.content} 
                    ref={el => this.taskInput = el}/>
            </div>
            <button onClick={() => {
                if(this.taskInput)
                    this.props.editTask(this.taskInput.value, this.props.data.timestamp);
                this.setState({edit: false});
            }}>OK</button>
        </>;
    }

    render() {
        let data = this.props.data;

        return <div>
            <h6 style={{
                margin: '4px 0px',
                textAlign: 'left'
            }}>Added: {new Date(data.timestamp).toLocaleString()}</h6>
            {this.state.edit ? this.renderEditInput() : <span>{data.content}</span>}
            <button className={'edit-btn'} onClick={() => this.setState({edit: true})}>EDIT</button>
            <button className={'delete-btn'} 
                onClick={() => this.props.deleteTask(data.timestamp)}>DELETE</button>
        </div>;
    }
}

export default connect(null, mapDispatchToProps)(Task);
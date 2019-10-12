import React from 'react';
import renderer from 'react-test-renderer';
import ConnectedTask, {Task} from './Task';
import { Provider } from 'react-redux';
import store from '../store';
import { TaskSchema } from '../reducers';
import { ACTION } from '../actions';

describe('Task component', () => {
    let timestamp = Date.now();

    store.dispatch({type: ACTION.ADD_TASK, content: 'Test content', timestamp});
    let task_data = store.getState().tasks[store.getState().tasks.length-1];//last task
    
    let connectedComponent: renderer.ReactTestInstance;

    beforeEach(() => {
        connectedComponent = renderer.create(<Provider store={store}>
            <ConnectedTask data={task_data} />
        </Provider>).root.findByType(Task);
    });

    it('Should display content', () => {
        const span = connectedComponent.findByType('span');
        expect(span.children.join('')).toBe('Test content');
    });

    it('Should display creation date', () => {
        const h6 = connectedComponent.findByType('h6');
        expect(h6.children.join('')).toBe('Added: ' + new Date(timestamp).toLocaleString());
    });

    it('Should be edited', () => {
        store.dispatch({type: ACTION.EDIT_TASK, content: 'changed content', timestamp});
        expect((connectedComponent.props['data'] as TaskSchema).content)
            .toEqual('changed content');
    });

    it('Should delete itself', () => {
        let current_tasks = store.getState().tasks.length;

        let deleteBtn = connectedComponent.findByProps({className: 'delete-btn'});
        renderer.act(() => {
            deleteBtn.props.onClick();
        });
        
        expect( store.getState().tasks.length ).toBe(current_tasks - 1);
    });
});
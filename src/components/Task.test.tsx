import React from 'react';
import Task from './Task';
import store from '../store';
import { ACTION } from '../actions';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';

describe('Task component', () => {
    let timestamp = Date.now();

    store.dispatch({type: ACTION.ADD_TASK, content: 'Test content', timestamp});
    let task_data = store.getState().tasks[store.getState().tasks.length-1];//last task
    
    let taskElement: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
        taskElement = mount(<Provider store={store}><Task data={task_data}/></Provider>, 
            {context: {store}});
    });

    it('Should display content', () => {
        const span = taskElement.find('span');
        expect(span.text()).toBe('Test content');
    });

    it('Should display creation date', () => {
        const h6 = taskElement.find('h6');
        expect(h6.text()).toBe('Added: ' + new Date(timestamp).toLocaleString());
    });

    it('Should display input after edit button click', () => {
        const editBtn = taskElement.find('button.edit-btn');

        expect( taskElement.find('input').length ).toEqual(0);
        editBtn.simulate('click');
        expect( taskElement.find('input').length ).toEqual(1);
    });

    it('Should edit itself', () => {
        const editBtn = taskElement.find('button.edit-btn');
        editBtn.simulate('click');

        const changedContent = 'changed content';

        //@ts-ignore
        taskElement.find('input').instance().value = changedContent;
        const applyEditBtn = taskElement.find('[data-test="edit-apply-btn"]');
        applyEditBtn.simulate('click');

        expect(taskElement.find(Task).props().data.content).toEqual(changedContent);
    });

    it('Should delete itself', () => {
        let current_tasks = store.getState().tasks.length;

        let deleteBtn = taskElement.find('button.delete-btn');
        deleteBtn.simulate('click');
        
        expect( store.getState().tasks.length ).toBe(current_tasks - 1);
    });
});
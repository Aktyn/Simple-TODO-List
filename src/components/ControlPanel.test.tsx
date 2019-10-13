import React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import ControlPanel from './ControlPanel';
import store from '../store';
import { Provider } from 'react-redux';

describe('ControlPanel component', () => {
    let panel: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
        panel = mount(<Provider store={store}><ControlPanel /></Provider>, {context: {store}});
    });

    it('Should not add empty task', () => {
        let current_tasks = store.getState().tasks.length;
        
        let addButton = panel.find('button');
        addButton.simulate('click');

        expect( store.getState().rejected_task_reason ).not.toBe(null);
        expect( store.getState().rejected_task_reason )
            .toEqual( panel.find('[data-test="error-msg"]').text() );
        //expect same number of tasks
        expect(current_tasks).toEqual( store.getState().tasks.length );
    });

    it('Should add task', () => {
        let current_tasks = store.getState().tasks.length;
        let content_input = panel.find('input');

        const test_value = 'example task content';

        //@ts-ignore
        content_input.instance().value = test_value;

        let addButton = panel.find('button');
        addButton.simulate('click');

        let last_task = store.getState().tasks[store.getState().tasks.length-1];
        expect(last_task.content).toEqual(test_value);

        expect(store.getState().tasks.length).toEqual( current_tasks + 1 );
    });
});
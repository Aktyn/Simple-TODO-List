import React from "react";
import ControlPanel from "./components/ControlPanel";
import TasksList from "./components/TasksList";

import store from "./store";
import { Provider } from "react-redux";

export default class App extends React.Component {
	render() {
		return <div className={'layout'}>
			<Provider store={store}>
				<ControlPanel />
				<TasksList />
			</Provider>
		</div>;
	}
}
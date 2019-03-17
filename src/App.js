import React, { Component } from 'react';
import Request from './components/request';

class App extends Component {
	state = {
		request: {
			event: 'departure',
		},
	};

	changeEvent = event => {
		const request = {
			event: event,
		};
		this.setState({ request });
	};

	render() {
		const { event } = this.state.request;
		return <Request event={event} changeEvent={this.changeEvent} />;
	}
}

export default App;

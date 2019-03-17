import React, { Component } from 'react';
import axios from 'axios';
import Main from './main';

class Request extends Component {
	state = {
		data: {
			date: '',
			pagination: {
				total: 0,
				limit: 0,
				offset: 0,
			},
			station: {
				code: 's9600213',
				title: 'Шереметьево',
				station_type: 'аэропорт',
				popular_title: '',
				short_title: '',
				transport_type: '',
				type: '',
			},
			schedule: null,
			interval_schedule: [
				{
					except_days: null,
					thread: {
						uid: '',
						title: '',
						interval: {
							density: '',
							end_time: '',
							begin_time: '',
						},
						number: '',
						short_title: '',
						carrier: null,
						transport_type: '',
						vehicle: null,
						transport_subtype: {
							color: '',
							code: '',
							title: '',
						},
						express_type: null,
					},
					is_fuzzy: false,
					days: '',
					stops: '',
					terminal: null,
					platform: '',
				},
			],
			schedule_direction: {
				code: '',
				title: '',
			},
			directions: [
				{
					code: '',
					title: '',
				},
				{
					code: '',
					title: '',
				},
				{
					code: '',
					title: '',
				},
			],
		},
		inputValue: '',
	};
	d = new Date().toISOString().slice(0, 10);

	requestData = (event = 'departure') => {
		axios
			.get('http://localhost:3001/api/test', {
				params: {
					apikey: 'c623f5c8-8e38-4840-bd57-e89c0ff01768',
					transport_type: 'plane',
					station: 's9600213',
					data: this.d,
					event: event,
					limit: 5000,
				},
			})
			.then(response => {
				this.setState({ data: response.data, inputValue: '' });
			})
			.catch(error => {
				console.log(error);
			});
	};

	onChahgeHandler = e => {
		this.setState({
			inputValue: e,
		});
	};

	componentDidMount() {
		this.requestData();
	}

	render() {
		const { event, changeEvent } = this.props;
		const {
			data: { station, schedule },
			inputValue,
		} = this.state;
		return (
			<Main
				event={event}
				inputValue={inputValue}
				onChahgeHandler={this.onChahgeHandler}
				requestData={this.requestData}
				date={this.d}
				station={station}
				schedule={schedule}
				changeEvent={changeEvent}
			/>
		);
	}
}
export default Request;

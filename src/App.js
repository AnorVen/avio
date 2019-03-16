import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

class App extends Component {
	state = {
		data: {
			date: '',
			pagination: {
				total: 210,
				limit: 100,
				offset: 0,
			},
			station: {
				code: 's9600213',
				title: 'Шереметьево',
				station_type: 'аэропорт',
				popular_title: '',
				short_title: '',
				transport_type: 'train',
				type: 'station',
			},
			schedule: [
				{
					except_days: '6, 7, 8, 9, 13, 14 февраля',
					arrival: '2017-02-27T00:04:00+03:00',
					thread: {
						uid: '7303A_9600213_g13_af',
						title: 'аэропорт Шереметьево - Москва (Белорусский вокзал)',
						number: '7303',
						short_title: 'а/п Шереметьево - Москва (Белорусский вокзал)',
						carrier: {
							code: 153,
							codes: {
								icao: null,
								sirena: null,
								iata: null,
							},
							title: 'Центральная пригородная пассажирская компания',
						},
						transport_type: 'suburban',
						vehicle: null,
						transport_subtype: {
							color: '#FF7F44',
							code: 'suburban',
							title: 'Пригородный поезд',
						},
						express_type: 'aeroexpress',
					},
					is_fuzzy: false,
					days: 'ежедневно',
					stops: 'без остановок',
					departure: '2017-02-27T00:05:00+03:00',
					terminal: null,
					platform: '',
				},
			],
			interval_schedule: [
				{
					except_days: null,
					thread: {
						uid: '502-*28mxt*29_0_f9744758t9744460_r2531_1',
						title: 'Москва (м. Медведково) — Пироговский (Посёлок Пироговский)',
						interval: {
							density: 'маршрутное такси раз в 15-30 минут',
							end_time: '2017-07-10T21:30:00',
							begin_time: '2017-07-10T06:00:00',
						},
						number: '502 (м/т)',
						short_title: 'Москва (м. Медведково) — Пироговский (Посёлок Пироговский)',
						carrier: null,
						transport_type: 'bus',
						vehicle: null,
						transport_subtype: {
							color: '#ff0000',
							code: 'bus',
							title: 'Автобус',
						},
						express_type: null,
					},
					is_fuzzy: false,
					days: 'ежедневно',
					stops: '',
					terminal: null,
					platform: '',
				},
			],
			schedule_direction: {
				code: 'на Москву',
				title: 'на Москву',
			},
			directions: [
				{
					code: 'arrival',
					title: 'прибытие',
				},
				{
					code: 'на Москву',
					title: 'на Москву',
				},
				{
					code: 'all',
					title: 'все направления',
				},
			],
		},
		request: {
			event: 'departure',
		},
	};

	d = new Date().toISOString().slice(0, 10);
	requestData = () => {
		axios
			.get('http://localhost:3001/api/test', {
				params: {
					apikey: 'c623f5c8-8e38-4840-bd57-e89c0ff01768',
					transport_type: 'plane',
					station: 's9600213',
					data: this.d,
					event: this.state.request.event,
					limit: 50,
				},
			})
			.then(response => {
				console.log(response.data);
				this.setState({ data: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	};

	componentDidMount() {
		this.requestData();
	}

	changeEvent = event => {
		const request = {
			event: event,
		};
		this.setState({ request });
	};
	componentDidUpdate() {
		//this.requestData();
	}

	render() {
		const { station, schedule } = this.state.data;
		return (
			<div className="App">
				<h2>{station.title}</h2>
				<p>
					Дата: <span>{this.d}</span>
				</p>
				<p>{this.state.request.event}</p>
				<button onClick={() => this.changeEvent('departure')}>Вылеты</button>
				<button onClick={() => this.changeEvent('arrival')}>Прилеты</button>
				<div>
					{schedule.map(item => (
						<div key={_.uniqueId()}>
							<p>
								{item.departure}
								{item.arrival}
							</p>
							<p>{item.thread.number}</p>
							<p>{item.thread.short_title}</p>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default App;

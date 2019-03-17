import React, { Component } from 'react';
import Point from './point';
import _ from 'lodash';
import styled from 'styled-components';

const App = styled.div`
	margin: 0;
`;
const Wrapp = styled.div`
	max-width: 700px;
	margin: 0 auto;
`;
const Label = styled.label``;
const BtnBlock = styled.div`
	display: flex;
	justify-content: space-around;
`;

const List = styled.div``;

const Item = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 4px solid red;
`;

const Number = styled.p`
	padding: 0 10px;
	width: 200px;
`;
const Time = styled.p`
	width: 100px;
`;
class Main extends Component {
	onChange = e => this.props.onChahgeHandler(e.target.value);

	render() {
		const { station, date, inputValue, event, changeEvent, requestData, schedule } = this.props;

		const renderSchedule = inputValue
			? schedule.filter(
					item => item.thread.number.toLowerCase().search(inputValue.toLowerCase()) !== -1
			  )
			: schedule;

		return (
			<App>
				<Wrapp>
					<h2>{station.title}</h2>
					<p>
						Дата: <span>{date}</span>
					</p>

					<Label>
						Поиск рейса{' '}
						<input placeholder={'SU 1339'} value={inputValue} onChange={this.onChange} />
					</Label>
					<p>{event === 'departure' ? 'Вылеты' : 'Прилеты'}</p>
					<BtnBlock>
						<button
							onClick={() => {
								changeEvent('departure');
								requestData('departure');
							}}
						>
							Вылеты
						</button>
						<button
							onClick={() => {
								changeEvent('arrival');
								requestData('arrival');
							}}
						>
							Прилеты
						</button>
					</BtnBlock>
					<List>
						<Item>
							<Time>Время вылета</Time>
							<Number>№ рейса</Number>
							<p>Направление полета</p>
						</Item>
						{schedule && (
							<div>
								{renderSchedule.map(item => (
									<Point data={item} key={_.uniqueId()} />
								))}
							</div>
						)}
					</List>
				</Wrapp>
			</App>
		);
	}
}

export default Main;

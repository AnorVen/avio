import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid red;
`;
const Number = styled.p`
	padding: 0 10px;
	width: 200px;
`;
const Time = styled.p`
	width: 100px;
`;

const Point = props => {
	const { data } = props;
	return (
		<Item>
			<Time>
				{data.departure}
				{data.arrival}
			</Time>
			<Number>{data.thread.number}</Number>
			<p>{data.thread.short_title}</p>
		</Item>
	);
};
export default Point;

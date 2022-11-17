import React from 'react';

import { Container } from './styles';

export default function Cards({ children, ...rest }) {
	return (
		<Container {...rest}>
			{children}
		</Container>
	)
}
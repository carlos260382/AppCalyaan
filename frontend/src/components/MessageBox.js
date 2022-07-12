/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function MessageBox(props) {
	console.log('alerta', props.children);
	return (
		<div className={`alert alert-${props.variant || 'info'}`}>
			{props.children}
		</div>
	);
}

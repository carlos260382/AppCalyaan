// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTurn } from '../actions/turnAction.js';
// import Cookie from 'universal-cookie';

const Calendar = props => {
	console.log('estas son las props', props);
	const userSignin = useSelector(state => state.userSignin);
	const { userInfo } = userSignin;
	const dispatch = useDispatch();
	console.log('informacion de usuario', userInfo);

	
	const [turn, setTurn] = useState({
		seller: userInfo,
		day: '',
		hour: '',
	});

	const handleChange = e => {
		setTurn({
			...turn,
			[e.target.name]: e.target.value,
		});
		console.log('este es el turno', turn);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (dispatch(createTurn(turn))) alert('Turno creado con exito');
	};

	// useEffect(() => {
	//     if (success) {
	//       props.history.push(`/order/${order._id}`)
	//       //props.history.push(`/order/${order._id}`);
	//       //dispatch({ type: TURN_CREATE_RESET });
	//     }
	//   }, [dispatch, success]);

	return (
		<form onSubmit={handleSubmit}>
			<h1>
				Elije la fecha y hora para agendar su turno (solo aplica para solicitud
				de servicios y no de productos)
			</h1>
			<div>
				<label>Selecciona la Fecha</label>
				<input type='date' name='day' onChange={handleChange} />
			</div>

			<div>
				<label>Selecciona la Hora</label>

				<select name='hour' onChange={handleChange}>
					<option value='09:00 AM'>09:00 AM</option>
					<option value='10:00 AM'>10:00 AM</option>
					<option value='11:00 AM'>11:00 AM</option>
					<option value='12:00 PM'>12:00 PM</option>
					<option value='1:00 PM'>1:00 PM</option>
					<option value='15:00 PM'>15:00 PM</option>
					<option value='16:00 PM'>16:00 PM</option>
					<option value='17:00 PM'>17:00 PM</option>
					<option value='18:00 PM'>18:00 PM</option>
				</select>
			</div>
			<input type='submit' value='Enviar Turno' />
		</form>
	);
};

export default Calendar;

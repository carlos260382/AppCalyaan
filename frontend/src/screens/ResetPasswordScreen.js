/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { recoverPassword } from '../actions/userActions';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
import styles from '../style/SigninScreen.module.css';

export default function RegisterScreen(props) {
	console.log('props q llegan', props);
	const { id, number } = props.match.params;
	console.log('el id', id);
	console.log('el numero', number);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/';

	// const userRegister = useSelector(state => state.userRegister);
	// const { userInfo } = userRegister;

	const dispatch = useDispatch();
	const submitHandler = e => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Las contraseñas no coinciden');
		} else {
			dispatch(recoverPassword(password, id, number));
			alert('Contraseña restaurada con exito');
			props.history.push(redirect);
		}
	};
	// useEffect(() => {
	// 	if (userInfo) {
	// 		props.history.push(redirect);
	// 	}
	// }, [props.history, redirect, userInfo]);
	return (
		<div className={styles.container}>
			<form className='form' onSubmit={submitHandler}>
				<div>
					<label htmlFor='password'>Contraseña</label>
					<input
						type='password'
						id='password'
						placeholder='Enter password'
						required
						onChange={e => setPassword(e.target.value)}
					></input>
				</div>
				<div>
					<label htmlFor='confirmPassword'>Confirmar Contraseña</label>
					<input
						type='password'
						id='confirmPassword'
						placeholder='Enter confirm password'
						required
						onChange={e => setConfirmPassword(e.target.value)}
					></input>
				</div>
				<div>
					<label />
					<button className='primary' type='submit'>
						Restaurar Contraseña
					</button>
				</div>
				<label />
			</form>
		</div>
	);
}

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import styles from '../style/SigninScreen.module.css';

export default function SigninScreen(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/';

	const userSignin = useSelector(state => state.userSignin);
	const { userInfo, loading, error } = userSignin;

	const dispatch = useDispatch();
	const submitHandler = e => {
		e.preventDefault();
		dispatch(signin(email, password));
	};
	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [props.history, redirect, userInfo]);
	return (
		<div className={styles.container}>
			<form className='form' onSubmit={submitHandler}>
				<div className={styles.inicio}>
					<h1>Iniciar sesión</h1>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant='danger'>{error}</MessageBox>}
				<div>
					<label htmlFor='email'>Correo Electronico</label>
					<input
						type='email'
						id='email'
						placeholder='Enter email'
						required
						onChange={e => setEmail(e.target.value)}
					></input>
				</div>
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
					<label />
					<button type='submit'>Iniciar sesión</button>
				</div>
				<div>
					<label />
					<div className={styles.register}>
						Nuevo cliente? <Link to={'/register/01'}>Crea tu cuenta</Link>
					</div>
					<div className={styles.register}>
						<Link to={`/recoverPassword`}>Recuperar Contraseña</Link>
					</div>
				</div>
			</form>
		</div>
	);
}

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import styles from '../style/SigninScreen.module.css';

export default function RegisterScreen(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState();

	const submitHandler = async e => {
		e.preventDefault();

		setIsLoading(true);
		console.log('datos del email', email);
		await Axios.post(
			`${process.env.REACT_APP_API_BASE_URL}/api/users/forgotPassword`,
			{ email }
		)
			.then(res => {
				setIsLoading(false);
				alert(
					'revise su email se le ha enviado un enlace para crear una nueva contraseña'
				);
			})
			.catch(err => {
				setIsLoading(false);
				console.log(err);
				alert('error al enviar el correo');
			});
	};

	return (
		<div className={styles.container}>
			<form className='form' onSubmit={e => submitHandler(e)}>
				<div>
					<h1>Recuperar Cuenta</h1>
				</div>
				{isLoading && <LoadingBox></LoadingBox>}
				<div>
					<label htmlFor='email'>Correo Electrónico</label>
					<input
						type='email'
						id='email'
						placeholder='Enter email'
						onChange={e => setEmail(e.target.value)}
						required
					></input>
				</div>

				<div>
					<button className='primary' type='submit'>
						Enviar email
					</button>
				</div>
			</form>
		</div>
	);
}

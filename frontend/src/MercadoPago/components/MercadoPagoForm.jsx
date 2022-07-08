/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import useScript from '../hooks/useScript.js';
import { formConfig } from './formConfig';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useParams, useHistory } from 'react-router-dom';
import styles from '../../style/MercadoPagoForm.module.css';
import { payOrder, detailsOrder } from '../../actions/orderActions.js';
import { useDispatch, useSelector } from 'react-redux';

const INITIAL_STATE = {
	cvc: '',
	cardExpirationMonth: '',
	cardExpirationYear: '',
	focus: 'cardNumber',
	cardholderName: '',
	cardNumber: '',
	identificationType: '',
	identificationNumber: '',
	issuer: '',
	installments: '',
};

export default function MercadoPagoForm(props) {
	const { id } = useParams();
	console.log('este es el id', id);
	const [state, setState] = useState(INITIAL_STATE);
	const resultPayment = useMercadoPago();
	const dispatch = useDispatch();
	const history = useHistory();

	const orderDetails = useSelector(state => state.orderDetails);
	const { order } = orderDetails;

	const handleInputChange = e => {
		setState({
			...state,
			[e.target.dataset.name || e.target.name]: e.target.value,
		});
		// console.log('este es el stado', state)
	};

	const handleInputFocus = e => {
		setState({ ...state, focus: e.target.dataset.name || e.target.name });
	};

	function useMercadoPago() {
		const [resultPayment, setResultPayment] = useState(undefined);

		// const userSignin = useSelector((state) => state.userSignin);
		// const { userInfo } = userSignin;

		const { MercadoPago } = useScript(
			'https://sdk.mercadopago.com/js/v2',
			'MercadoPago'
		);

		useEffect(() => {
			if (!order || (order && order._id !== id)) {
				dispatch(detailsOrder(id));
			}

			let price = '';
			if (order) price = order.totalPrice;
			const value = price.toString();

			if (MercadoPago) {
				console.log('pago', value);
				const mp = new MercadoPago(
					'APP_USR-0e043c2b-a009-4847-8479-1348b83c143c'
				);

				const cardForm = mp.cardForm({
					amount: value,
					autoMount: true,
					form: formConfig,
					callbacks: {
						onFormMounted: error => {
							if (error)
								return console.warn('Form Mounted handling error: ', error);
						},

						onSubmit: event => {
							event.preventDefault();

							const {
								paymentMethodId: payment_method_id,
								issuerId: issuer_id,
								cardholderEmail: email,
								amount,
								token,
								installments,
								identificationNumber,
								identificationType,
							} = cardForm.getCardFormData();

							fetch(`${process.env.REACT_APP_API_BASE_URL}/process-payment`, {
								// entry point backend
								method: 'POST',
								headers: {
									'Access-Control-Allow-Origin': '*',
									'Access-Control-Request-Method':
										'GET, POST, DELETE, PUT, OPTIONS',
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									token,
									orderId: id,
									issuer_id,
									payment_method_id,
									transaction_amount: amount,
									installments,
									description: 'Descripción del producto',
									payer: {
										email,
										identification: {
											type: identificationType,
											number: identificationNumber,
										},
									},
								}),
							})
								.then(res => res.json())
								.then(data => {
									setResultPayment(data);
									console.log('primer resultado', data);
									if (data.status === 'approved')
										dispatch(payOrder(id, resultPayment));
									//handlerGoTo();
								})
								.catch(err => {
									setResultPayment(err);
								});
						},
						onFetching: resource => {
							console.log('Fetching resource: ', resource);
							// Animate progress bar
							const progressBar = document.querySelector('.progress-bar');
							progressBar.removeAttribute('value');

							return () => {
								progressBar.setAttribute('value', '0');
							};
						},
					},
				});
			}

			if (resultPayment) handlerGoTo();
		}, [MercadoPago, resultPayment]);
		console.log('resultado pago', resultPayment);

		return resultPayment;
	}

	const handlerGoTo = () => {
		if (
			resultPayment.status === 'approved' &&
			resultPayment.status_detail === 'accredited'
		) {
			alert('Pago realizado con exito');
			history.push(`/order/${order._id}`);
		}
		if (
			resultPayment.status === 'rejected' &&
			resultPayment.status_detail === 'cc_rejected_other_reason'
		) {
			alert(
				'Pago rechazado por error general, vuelva a intentarlo verificando sus datos'
			);
			history.push(`/mercadoPago/${order._id}`);
		}

		if (
			resultPayment.status === 'in_process' &&
			resultPayment.status_detail === 'pending_contingency'
		) {
			alert('Pago pendiente por ser procesado');
			history.push(`/order/${order._id}`);
		}

		if (
			resultPayment.status === 'rejected' &&
			resultPayment.status_detail === 'cc_rejected_call_for_authorize'
		) {
			alert('Pago Rechazado con validación para autorizar');
			history.push(`/order/${order._id}`);
		}

		if (
			resultPayment.status === 'rejected' &&
			resultPayment.status_detail === 'cc_rejected_insufficient_amount'
		) {
			alert('Pago Rechazado por importe insuficiente, pruebe con otra tarjeta');
			history.push(`/order/${order._id}`);
		}

		if (
			resultPayment.status === 'rejected' &&
			resultPayment.status_detail === 'cc_rejected_bad_filled_security_code'
		) {
			alert('Pago Rechazado por código de seguridad inválido	');
			history.push(`/order/${order._id}`);
		}

		if (
			resultPayment.status === 'rejected' &&
			resultPayment.status_detail === 'cc_rejected_bad_filled_date'
		) {
			alert('Pago Rechazado por problema en la fecha de vencimiento');
			history.push(`/order/${order._id}`);
		}

		if (
			resultPayment.status === 'rejected' &&
			resultPayment.status_detail === 'cc_rejected_bad_filled_other'
		) {
			alert('Pago Rechazado debido a un error de formulario');
			history.push(`/order/${order._id}`);
		}
	};

	return (
		<div className={styles.container}>
			<Card
				cvc={state.cvc}
				expiry={state.cardExpirationMonth + state.cardExpirationYear}
				name={state.cardholderName}
				number={state.cardNumber}
				focused={state.focus}
				identificationType={state.identificationType}
				identificationNumber={state.identificationNumber}
				brand={state.issuer}
				paymentMethodId={state.paymentMethodId}

				// orderId={orderId}
			/>
			<div className={styles.form}>
				<form id='form-checkout'>
					<div className='form-control'>
						<input
							type='tel'
							name='cardNumber'
							id='form-checkout__cardNumber'
							placeholder='Número de la tarjeta'
							onChange={handleInputChange}
							onFocus={handleInputFocus}
						/>
					</div>
					<div className='form-control'>
						<input
							type='tel'
							name='cardExpirationMonth'
							id='form-checkout__cardExpirationMonth'
							placeholder='Mes de vencimiento'
							onChange={handleInputChange}
							onFocus={handleInputFocus}
						/>
						<input
							type='tel'
							name='cardExpirationYear'
							id='form-checkout__cardExpirationYear'
							placeholder='Año de vencimiento'
							onChange={handleInputChange}
							onFocus={handleInputFocus}
						/>
						<input
							type='tel'
							name='cvc'
							id='form-checkout__securityCode'
							placeholder='Código de seguridad'
							onChange={handleInputChange}
							onFocus={handleInputFocus}
						/>
					</div>
					<div className='form-control'>
						<input
							type='text'
							name='cardholderName'
							id='form-checkout__cardholderName'
							placeholder='Titular de la tarjeta'
							onChange={handleInputChange}
							onFocus={handleInputFocus}
						/>
						<input
							type='email'
							name='cardholderEmail'
							id='form-checkout__cardholderEmail'
							placeholder='E-mail'
							onFocus={handleInputFocus}
						/>
					</div>
					<div className='form-control'>
						<select
							name='issuer'
							id='form-checkout__issuer'
							placeholder='Banco emisor'
							on='true'
							onChange={handleInputChange}
						></select>
						<select
							name='identificationType'
							id='form-checkout__identificationType'
							placeholder='Tipo de documento'
							onChange={handleInputChange}
						></select>
					</div>
					<div className='form-control'>
						<input
							type='text'
							name='identificationNumber'
							id='form-checkout__identificationNumber'
							placeholder='Número de documento'
							onChange={handleInputChange}
						/>
					</div>
					<div className='form-control'>
						<select
							name='installments'
							id='form-checkout__installments'
							placeholder='Cuotas'
							onChange={handleInputChange}
						></select>
					</div>
					<div className='form-control'>
						<button type='submit' id='form-checkout__submit'>
							Pagar
						</button>
					</div>
					<progress value='0' className='progress-bar'>
						Cargando...
					</progress>
				</form>
				{/* {resultPayment && (<button className={styles.btn} onClick={handlerGoTo}>Revisar Estado del Pago</button>)} */}
			</div>
		</div>
	);
}

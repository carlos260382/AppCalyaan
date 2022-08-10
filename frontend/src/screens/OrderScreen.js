/* eslint-disable no-const-assign */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, updateValue } from '../actions/orderActions';
import { signoutHome } from '../actions/userActions.js';
import { listTurns } from '../actions/turnAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import styles from '../style/OrderScreen.module.css';

import {
	ORDER_DELIVER_RESET,
	ORDER_PAY_RESET,
} from '../constants/orderConstants';

export default function OrderScreen(props) {
	const id = props.match.params.id;
	console.log('estas son las props', id);
	const [sdkReady, setSdkReady] = useState(false);
	const orderDetails = useSelector(state => state.orderDetails);
	const { order, loading, error } = orderDetails;
	console.log('order new', order);
	const userSignin = useSelector(state => state.userSignin);
	const { userInfo } = userSignin;

	const turnList = useSelector(state => state.turnList);
	const { turns, loadingTurn } = turnList;

	const turnUser = turns && turns.find(e => e.orderId === id);

	const orderPay = useSelector(state => state.orderPay);
	const { success: successPay } = orderPay;

	const orderDeliver = useSelector(state => state.orderDeliver);
	const { success: successDeliver } = orderDeliver;

	console.log('turno', turnUser);

	const dispatch = useDispatch();

	useEffect(() => {
		if (loadingTurn) {
			dispatch(listTurns());
		}

		if (!order || successPay || successDeliver || (order && order._id !== id)) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });

			dispatch(detailsOrder(id));
		} else {
			if (!order.isPaid) {
				// eslint-disable-next-line no-empty
				if (!window.paypal) {
				} else {
					setSdkReady(true);
				}
			}
		}
	}, [
		dispatch,
		id,
		sdkReady,
		successPay,
		successDeliver,
		order,
		turns,
		loadingTurn,
	]);

	// const turnUser = turns && turns.find(e => e.orderId === id);
	// console.log('este es turn Filter', turnUser);

	const irMercadoPago = () => {
		props.history.push(`/mercadoPago/${order._id}`);
	};

	const redeemPoints = () => {
		const points = {
			points: order.userPoints,
			userId: userInfo._id,
		};
		if (window.confirm('¿Desea redimir sus puntos?')) {
			dispatch(updateValue(id, points));
			window.location.replace('');
			dispatch(signoutHome());
		}
	};

	return loading ? (
		<LoadingBox></LoadingBox>
	) : error ? (
		<MessageBox variant='danger'>{error}</MessageBox>
	) : (
		<div>
			<h1>Pedido {order._id}</h1>
			<div className={styles.container}>
				<div className={styles.turn}>
					<h3>Día y hora del Turno Seleccionado</h3>
					<p>Fecha: {turnUser ? turnUser.day : ''} </p>
					<p>Hora: {turnUser ? turnUser.hour : ''}</p>
					<p>
						Codigo de confirmación: {turnUser ? turnUser.keyCode : ''} <br />{' '}
						(este numero sera mostrado por el profesional para confirmación)
					</p>
					<p>
						Estado: {turnUser && turnUser.status ? 'Aprobado' : 'Pendiente'}
					</p>
					<button className={styles.btn} onClick={irMercadoPago}>
						Pagar
					</button>

					{/* {turnUser && turnUser.status ? (
						<button className={styles.btn} onClick={irMercadoPago}>
							Pagar
						</button>
					) : (
						<div className={styles.pay}>
							En cuanto sea aceptado el servicio aca aparecera la opcion para
							realizar el pago
						</div>
					)} */}
				</div>

				<div>
					<div className={styles.card}>
						<p>
							<p>Direccion: </p>
							{order.shippingAddress.address},{order.shippingAddress.city},{' '}
							{order.shippingAddress.postalCode},{order.shippingAddress.country}
						</p>

						<div>
							<h2>Servicio Solicitado</h2>
							<ul>
								{order.orderItems.map(item => (
									<li key={item.product}>
										<div className={styles.service}>
											<div>
												<img
													src={item.image}
													alt={item.name}
													className='small'
												></img>
											</div>
											<div>
												<Link to={`/product/${item.product}`}>{item.name}</Link>
											</div>

											<div>
												{item.qty} x ${item.price} = ${item.qty * item.price}
											</div>
											<div>
												<h2>Total a pagar por este medio</h2>${order.totalPrice}
												<h4>
													Cancelas por este medio el 35% del valor total del
													servicio
												</h4>
												<div>
													{userInfo && order.userPoints > 0 ? (
														<div>
															<h5>Puntos Acumulados {order.userPoints}</h5>
															<button onClick={redeemPoints}>
																Para redimirlos haz click aqui
															</button>
														</div>
													) : (
														''
													)}{' '}
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>

						<h2>Estado</h2>
						{order.isDelivered ? (
							<MessageBox variant='success'>
								Servicio Realizado en {order.deliveredAt}
							</MessageBox>
						) : (
							<MessageBox variant='danger'>Pendiente por realizar</MessageBox>
						)}
						{order.isPaid ? (
							<MessageBox variant='success'>
								Pagado el dia {order.paidAt}
							</MessageBox>
						) : (
							<MessageBox variant='danger'>Pendiente por pago</MessageBox>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';

import { ORDER_CREATE_RESET } from '../constants/orderConstants';

import styles from '../style/PlaceOrderScreen.module.css';

export default function PlaceOrderScreen(props) {
	const cart = useSelector(state => state.cart);
	const userSignin = useSelector(state => state.userSignin);
	const { userInfo } = userSignin;

	if (!cart.paymentMethod) {
		props.history.push('/payment');
	}

	const orderCreate = useSelector(state => state.orderCreate);

	const { success, order } = orderCreate;

	const toPrice = num => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
	cart.itemsPrice = toPrice(
		cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
	);

	cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
	cart.taxPrice = toPrice(0 * cart.itemsPrice);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	const dispatch = useDispatch();

	const placeOrderHandler = () => {
		dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
	};

	useEffect(() => {
		cart.shippingAddress.fullName = userInfo.name;
		if (success) {
			props.history.push(`/orderTurn/${order._id}`);
			// props.history.push(`/turn`);
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [dispatch, order, props.history, success]);

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.container1}>
					<div className='card card-body'>
						<p>
							<strong>Dirección: </strong> {cart.shippingAddress.address},
							{cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
							{cart.shippingAddress.country}
						</p>
					</div>

					<div className='card card-body'>
						<h2>Servicios seleccionados</h2>
						<ul>
							{cart.cartItems.map(item => (
								<li key={item.product}>
									<div className='row'>
										<div>
											<img
												src={item.image}
												alt={item.name}
												className='small'
											></img>
										</div>
										<div className='min-30'>
											<Link to={`/service/${item.product}`}>{item.name}</Link>
										</div>

										<div>
											{item.qty} x ${item.price} = ${item.qty * item.price}
										</div>
									</div>
								</li>
							))}
							<li>
								<button
									className={styles.btn}
									onClick={placeOrderHandler}
									disabled={cart.cartItems.length === 0}
								>
									Realizar pedido
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

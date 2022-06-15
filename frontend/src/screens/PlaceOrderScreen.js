/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import styles from '../style/PlaceOrderScreen.module.css';

export default function PlaceOrderScreen(props) {
	const cart = useSelector(state => state.cart);

	if (!cart.paymentMethod) {
		props.history.push('/payment');
	}

	const orderCreate = useSelector(state => state.orderCreate);

	const { loading, success, error, order } = orderCreate;

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

	console.log('este es el carrito', cart);
	// console.log ('esta es la orden', orderCreate);

	useEffect(() => {
		if (success) {
			props.history.push(`/orderTurn/${order._id}`);
			// props.history.push(`/turn`);
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [dispatch, order, props.history, success]);

	return (
		<div className={styles.container}>
			<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
			<div className={styles.container1}>
				<div className={styles.col1}>
					<ul>
						<li>
							<div className='card card-body'>
								<h2>Información del solicitante</h2>
								<p>
									<strong>Nombre:</strong> {cart.shippingAddress.fullName}{' '}
									<br />
									<strong>Dirección: </strong> {cart.shippingAddress.address},
									{cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
									,{cart.shippingAddress.country}
								</p>
							</div>
						</li>
						<li>
							{/* <div className="card card-body">
                 <p>
                  <strong>Método de pago:</strong> {cart.paymentMethod}
                </p>
              </div> */}
						</li>
						<li>
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
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</div>

												<div>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div className={styles.check}>
					<div>
						<ul>
							<li>
								<h2>Resumen del pedido</h2>
							</li>
							<li>
								<div className='row'>
									<div>Servicios</div>
									<div>${cart.itemsPrice.toFixed(2)}</div>
								</div>
							</li>
							{/* <li>
                <div className="row">
                  <div>Transporte</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Impuesto</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li> */}
							<li>
								<div className='row'>
									<div>
										<strong>Valor total</strong>
									</div>
									<div>
										<strong>${cart.totalPrice.toFixed(2)}</strong>
									</div>
								</div>
							</li>
							<li>
								<button
									className={styles.btn}
									onClick={placeOrderHandler}
									disabled={cart.cartItems.length === 0}
								>
									Realizar pedido
								</button>
							</li>
							{loading && <LoadingBox></LoadingBox>}
							{error && <MessageBox variant='danger'>{error}</MessageBox>}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import styles from '../style/CartScreen.module.css';

export default function CartScreen(props) {
	const productId = props.match.params.id;
	console.log('este es productID', productId);
	const qty = props.location.search
		? Number(props.location.search.split('=')[1])
		: 1;
	const cart = useSelector(state => state.cart);
	const { cartItems, error } = cart;
	const dispatch = useDispatch();
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = id => {
		// delete action
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		props.history.push('/signin?redirect=shipping');
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.h1}>Carrito de Compras</h1>
			<div className={styles.col1}>
				{error && <MessageBox variant='danger'>{error}</MessageBox>}
				{cartItems.length === 0 ? (
					<MessageBox>
						Carrito esta vacio <Link to='/'>Ir a Tienda</Link>
					</MessageBox>
				) : (
					<ul>
						{cartItems.map(item => (
							<li key={item.product}>
								<div className='row'>
									<div>
										<img
											src={item.image}
											alt={item.name}
											className={styles.img}
										></img>
									</div>
									<div className={styles.nameProduc}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</div>
									<div className={styles.selec}>
										<select
											value={item.qty}
											onChange={e =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.countInStock).keys()].map(x => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</select>
									</div>
									<div className={styles.price}>${item.price}</div>
									<div>
										<button
											className={styles.btnDelet}
											type='button'
											onClick={() => removeFromCartHandler(item.product)}
										>
											Eliminar
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
			<div className={styles.col2}>
				<div className='card card-body'>
					<ul>
						<li>
							<h2 className={styles.h2}>
								Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
								{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
							</h2>
						</li>
						<li>
							<button
								type='button'
								onClick={checkoutHandler}
								className={styles.btn}
								disabled={cartItems.length === 0}
							>
								Completa tu pedido
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

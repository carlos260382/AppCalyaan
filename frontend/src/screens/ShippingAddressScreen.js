/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import { createOrder } from '../actions/orderActions.js';
import { ORDER_CREATE_RESET } from '../constants/orderConstants.js';
import CheckoutSteps from '../components/CheckoutSteps';
import styles from '../style/ShippingAddressScreen.module.css';

export default function ShippingAddressScreen(props) {
	const userSignin = useSelector(state => state.userSignin);

	const { userInfo } = userSignin;
	console.log('Info de usuario', userInfo);

	const cart = useSelector(state => state.cart);
	const { shippingAddress } = cart;
	console.log('Info de address', shippingAddress);

	const [lat, setLat] = useState(shippingAddress.lat);
	const [lng, setLng] = useState(shippingAddress.lng);

	const userAddressMap = useSelector(state => state.userAddressMap);
	const { address: addressMap } = userAddressMap;

	if (!userInfo) {
		props.history.push('/signin');
	}
	const [fullName, setFullName] = useState(shippingAddress.fullName);
	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const orderCreate = useSelector(state => state.orderCreate);

	const { success, order } = orderCreate;
	const toPrice = num => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
	cart.itemsPrice = toPrice(
		cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
	);

	cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
	cart.taxPrice = toPrice(0 * cart.itemsPrice);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	useEffect(() => {
		if (success) {
			props.history.push(`/orderTurn/${order._id}`);
			// props.history.push(`/turn`);
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [dispatch, order, props.history, success]);

	const submitHandler = e => {
		e.preventDefault();
		setFullName(userInfo.name);
		setCountry('Colombia');
		cart.shippingAddress.fullName = userInfo.name;
		cart.shippingAddress.country = 'Colombia';
		const newLat = addressMap ? addressMap.lat : lat;
		const newLng = addressMap ? addressMap.lng : lng;
		if (addressMap) {
			setLat(addressMap.lat);
			setLng(addressMap.lng);
		}
		let moveOn = true;
		if (!newLat || !newLng) {
			moveOn = window.confirm(
				'No configuró su ubicación en el mapa. Continuar?'
			);
		}
		if (moveOn) {
			dispatch(
				saveShippingAddress({
					fullName,
					address,
					city,
					postalCode,
					country,
					lat: newLat,
					lng: newLng,
				})
			);
			// props.history.push('/placeorder');

			// props.history.push(`/orderTurn/${order._id}`);
		}
		if (cart) dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
		console.log('lo que va a la order', cart);
		console.log('lo que va a la order2', cart.cartItems);
	};

	const chooseOnMap = () => {
		dispatch(
			saveShippingAddress({
				fullName,
				address,
				city,
				postalCode,
				country,
				lat,
				lng,
			})
		);
		props.history.push('/map');
	};
	return (
		<div className={styles.container}>
			<CheckoutSteps step1 step2></CheckoutSteps>
			<form className='form' onSubmit={submitHandler}>
				<div>
					<h1>Dirección de envío</h1>
				</div>
				{/* <div>
					<label htmlFor='fullName'>Nombre Completo</label>
					<input
						type='text'
						id='fullName'
						placeholder='Enter full name'
						value={fullName}
						onChange={e => setFullName(e.target.value)}
						required
					></input>
				</div> */}
				<div>
					<label htmlFor='address'>Dirección</label>
					<input
						type='text'
						id='address'
						placeholder='Enter address'
						value={address}
						onChange={e => setAddress(e.target.value)}
						required
					></input>
				</div>
				<div>
					<label htmlFor='city'>Ciudad</label>
					<input
						type='text'
						id='city'
						placeholder='Enter city'
						value={city}
						onChange={e => setCity(e.target.value)}
						required
					></input>
				</div>
				<div>
					<label htmlFor='postalCode'>Código Postal</label>
					<input
						type='text'
						id='postalCode'
						placeholder='Enter postal code'
						value={postalCode}
						onChange={e => setPostalCode(e.target.value)}
						required
					></input>
				</div>
				{/* <div>
					<label htmlFor='country'>País</label>
					<input
						type='text'
						id='country'
						placeholder='Enter country'
						value={country}
						onChange={e => setCountry(e.target.value)}
						required
					></input>
				</div> */}
				<div>
					<label htmlFor='chooseOnMap'>Localización</label>
					<button type='button' onClick={chooseOnMap}>
						Elija en el mapa
					</button>
				</div>
				<div>
					<label />
					<button className={styles.btn} type='submit'>
						Continuar
					</button>
				</div>
			</form>
		</div>
	);
}

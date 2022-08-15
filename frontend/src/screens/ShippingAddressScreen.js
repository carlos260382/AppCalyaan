/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import { createOrder } from '../actions/orderActions.js';
import { ORDER_CREATE_RESET } from '../constants/orderConstants.js';
import styles from '../style/ShippingAddressScreen.module.css';
import Swal from 'sweetalert2';
import {
	LoadScript,
	GoogleMap,
	StandaloneSearchBox,
	Marker,
} from '@react-google-maps/api';
import LoadingBox from '../components/LoadingBox';
import Axios from 'axios';
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userConstants';

const libs = ['places'];
const defaultLocation = { lat: 45.516, lng: -73.56 };

export default function ShippingAddressScreen(props) {
	const cart = useSelector(state => state.cart);
	const { shippingAddress } = cart;
	const userSignin = useSelector(state => state.userSignin);
	const { userInfo } = userSignin;
	const [fullName, setFullName] = useState(shippingAddress.fullName);
	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);
	const [userPoints, setUserPoints] = useState(userInfo.pointsUser);
	const [userfatherId, setUserfatherId] = useState(userInfo.userfatherId);
	// Codigo Mapa Google

	const toPrice = num => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
	cart.itemsPrice = toPrice(
		cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
	);

	cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
	cart.taxPrice = toPrice(0.65 * cart.itemsPrice);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice - cart.taxPrice;

	const [googleApiKey, setGoogleApiKey] = useState('');
	const [center, setCenter] = useState(defaultLocation);
	const [location, setLocation] = useState(center);

	const mapRef = useRef(null);
	const placeRef = useRef(null);
	const markerRef = useRef(null);
	const orderCreate = useSelector(state => state.orderCreate);
	const { success, order } = orderCreate;
	const dispatch = useDispatch();
	if (!userInfo) {
		props.history.push('/signin');
	}
	useEffect(() => {
		const fetch = async () => {
			const { data } = await Axios(
				`${process.env.REACT_APP_API_BASE_URL}/api/config/google`
			);
			setGoogleApiKey(data);
			getUserCurrentLocation();
		};
		fetch();
		setFullName(userInfo.name);
		setCountry('Colombia');
		setUserPoints(userInfo.pointsUser);
		setUserfatherId(userInfo.userfatherId);
		if (success) {
			Swal.fire('Ubicación seleccionada con exito');
			props.history.push(`/orderTurn/${order._id}`);
			// props.history.push(`/turn`);
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [success, order]);

	const onLoad = map => {
		mapRef.current = map;
	};
	const onMarkerLoad = marker => {
		markerRef.current = marker;
	};
	const onLoadPlaces = place => {
		placeRef.current = place;
	};
	const onIdle = () => {
		setLocation({
			lat: mapRef.current.center.lat(),
			lng: mapRef.current.center.lng(),
		});
	};
	const onPlacesChanged = () => {
		const place = placeRef.current.getPlaces()[0].geometry.location;
		setCenter({ lat: place.lat(), lng: place.lng() });
		setLocation({ lat: place.lat(), lng: place.lng() });
	};

	const onConfirm = async () => {
		const places = placeRef.current.getPlaces();
		console.log('el place', places);
		if (places && places.length === 1) {
			// dispatch select action
			dispatch({
				type: USER_ADDRESS_MAP_CONFIRM,
				payload: {
					lat: location.lat,
					lng: location.lng,
					address: places[0].formatted_address,
					name: places[0].name,
					vicinity: places[0].vicinity,
					googleAddressId: places[0].id,
				},
			});

			cart.shippingAddress.fullName = fullName;
			cart.shippingAddress.country = country;
			cart.userPoints = userPoints;
			cart.userfatherId = userfatherId;
			cart.shippingAddress.address = places[0].formatted_address;
			cart.shippingAddress.city = places[0].vicinity;
			const newLat = location.lat;
			const newLng = location.lng;
			dispatch(
				saveShippingAddress({
					fullName,
					address,
					city,
					postalCode,
					country,
					userfatherId,
					lat: newLat,
					lng: newLng,
				})
			);
			// props.history.push('/placeorder');

			if (cart) {
				dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
				console.log('lo que va a la order', cart);
				dispatch({ type: ORDER_CREATE_RESET });
			}
		} else {
			alert('Por favor ingrese su dirección');
		}
	};

	const getUserCurrentLocation = async () => {
		if (!navigator.geolocation) {
			alert('La geolocalización no es compatible con este navegador');
		} else {
			navigator.geolocation.getCurrentPosition(position => {
				setCenter({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				setLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	};

	// Inicio formulario ShippinAnddress

	// const dispatch = useDispatch(); repetido

	// useEffect(() => {			Repetido
	// 	if (success) {
	// 		props.history.push(`/orderTurn/${order._id}`);
	// 		// props.history.push(`/turn`);
	// 		dispatch({ type: ORDER_CREATE_RESET });
	// 	}
	// }, [dispatch, order, props.history, success]);

	const submitHandler = e => {
		e.preventDefault();
		cart.shippingAddress.fullName = fullName;
		cart.shippingAddress.country = country;
		cart.userPoints = userPoints;
		cart.userfatherId = userfatherId;

		dispatch(
			saveShippingAddress({
				fullName,
				address,
				city,
				postalCode,
				userfatherId,
				country,
			})
		);
		// props.history.push('/placeorder');

		// props.history.push(`/orderTurn/${order._id}`);

		if (cart) dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));

		dispatch({ type: ORDER_CREATE_RESET });
	};
	console.log('usuario ID', typeof userfatherId);
	return googleApiKey ? (
		<div className={styles.container}>
			<div className={styles.map}>
				<h1>Use el buscador para encontrar su ubicacion exacta</h1>
				<span>
					Ingrese direccion completa (ejemplo: calle 100 # 20-35,
					Ciudad/Barrio/Localidad)
				</span>
				<LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
					<GoogleMap
						id='smaple-map'
						mapContainerStyle={{ height: '100%', width: '100%' }}
						center={center}
						zoom={15}
						onLoad={onLoad}
						onIdle={onIdle}
					>
						<StandaloneSearchBox
							onLoad={onLoadPlaces}
							onPlacesChanged={onPlacesChanged}
						>
							<div className='map-input-box'>
								<input
									type='text'
									placeholder='Ingrese su direccion completa'
								></input>
								<button type='button' onClick={onConfirm}>
									Confirmar
								</button>
							</div>
						</StandaloneSearchBox>
						<Marker position={location} onLoad={onMarkerLoad}></Marker>
					</GoogleMap>
				</LoadScript>
			</div>
			<div className={styles.sectionForm}>
				<h1>
					Tambien puede registrar su direccion en el formulario a continuacion
				</h1>

				<form className='form' onSubmit={submitHandler}>
					<div>
						<label htmlFor='address'>Dirección</label>
						<input
							type='text'
							id='address'
							placeholder='Ingrese su direccion'
							value={address}
							onChange={e => setAddress(e.target.value)}
							required
						></input>
					</div>
					<div>
						<label htmlFor='postalCode'>Barrio/Localidad/Casa/Apto.</label>
						<input
							type='text'
							id='postalCode'
							placeholder='Barrio/Casa/Apto.'
							value={postalCode}
							onChange={e => setPostalCode(e.target.value)}
							required
						></input>
					</div>
					<div>
						<label htmlFor='city'>Ciudad</label>
						<input
							type='text'
							id='city'
							placeholder='Ciudad'
							value={city}
							onChange={e => setCity(e.target.value)}
							required
						></input>
					</div>

					<div>
						<label />
						<button className={styles.btn} type='submit'>
							Continuar
						</button>
					</div>
				</form>
			</div>
		</div>
	) : (
		<LoadingBox></LoadingBox>
	);
}

/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import useScript from '../hooks/useScript.js';
import { formConfig } from './formConfig';
import Axios from 'axios';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useParams, useHistory } from 'react-router-dom';
import styles from '../../style/MercadoPagoForm.module.css';
import { payOrder, detailsOrder } from '../../actions/orderActions.js';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
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

export default function OpenPay(props) {
	const { id } = useParams();
	console.log('este es el id', id);
	const [state, setState] = useState(INITIAL_STATE);
	const dispatch = useDispatch();
	const history = useHistory();

	OpenPay.setId('mrkmblufal9w0czfm1s8');
	OpenPay.setApiKey('pk_60c131bde9d34c38862b8e6196cc2cd7');
	OpenPay.setSandboxMode(FLAG);
	OpenPay.token.create(
		CREATE_PARAMETERS_OBJECT,
		SUCCESS_CALLBACK,
		ERROR_CALLBACK
	);

    OpenPay.token.create({
        "card_number":"4111111111111111",
        "holder_name":"Juan Perez Ramirez",
        "expiration_year":"20",
        "expiration_month":"12",
        "cvv2":"110",
        "address":{
           "city":"Querétaro",
           "line3":"Queretaro",
           "postal_code":"76900",
           "line1":"Av 5 de Febrero",
           "line2":"Roble 207",
           "state":"Queretaro",
           "country_code":"MX"
        }
  }, onSuccess, onError);
	// OpenPay.token.extractFormAndCreate(CREATE_FORM_OBJECT, SUCCESS_CALLBACK, ERROR_CALLBACK, {CLIENTE-ID});

	OpenPay.token.extractFormAndCreate(
		$('#processCard'),
		successCard,
		errorCard,
		_customerId
	);

    function SuccessCallback(response) {
        alert('Successful operation');
        var content = '', results = document.getElementById('resultDetail');
        content .= 'Id card: ' + response.data.id+ '<br />';
        content .= 'Holder Name: ' + response.data.holder_name + '<br />';
        content .= 'Card brand: ' + response.data.brand + '<br />';
        results.innerHTML = content;
    }
    }

    function ErrorCallback(response) {
        alert('Fallo en la transacción');
        var content = '', results = document.getElementById('resultDetail');
        content .= 'Estatus del error: ' + response.data.status + '<br />';
        content .= 'Error: ' + response.message + '<br />';
        content .= 'Descripción: ' + response.data.description + '<br />';
        content .= 'ID de la petición: ' + response.data.request_id + '<br />';
        results.innerHTML = content;
    }


	const orderDetails = useSelector(state => state.orderDetails);
	const { order } = orderDetails;

	const handleInputChange = e => {
		setState({
			...state,
			[e.target.dataset.name || e.target.name]: e.target.value,
		});
		// console.log('este es el stado', state)
	};

	useEffect(() => {
		if (!order || (order && order._id !== id)) {
			dispatch(detailsOrder(id));
		}

		let price = '';
		if (order) price = order.totalPrice;
		const value = price.toString();
	}, []);
	console.log('resultado pago');

	return (
		<div>
			<form id='processCard' name='processCard'>
				<p>Holder Name:</p>
				<input data-openpay-card='holder_name' size='50' type='text' />
				<p>Card number:</p>
				<input data-openpay-card='card_number' size='50' type='text' />
				<p>Expiration year:</p>
				<input data-openpay-card='expiration_year' size='4' type='text' />
				<p>Expiration month:</p>
				<input data-openpay-card='expiration_month' size='4' type='text' />
				<p>cvv2:</p>
				<input data-openpay-card='cvv2' size='5' type='text' />
				<p>Street:</p>
				<input data-openpay-card-address='line1' size='20' type='text' />
				<p>Number:</p>
				<input data-openpay-card-address='line2' size='20' type='text' />
				<p>References:</p>
				<input data-openpay-card-address='line3' size='20' type='text' />
				<p>Postal code:</p>
				<input data-openpay-card-address='postal_code' size='6' type='text' />
				<p>City:</p>
				<input data-openpay-card-address='city' size='20' type='text' />
				<p>State:</p>
				<input data-openpay-card-address='state' size='20' type='text' />
				<p>Country code:</p>
				<input data-openpay-card-address='country_code' size='3' type='text' />
				<input id='makeRequestCard' type='button' value='Make Card' />
			</form>
		</div>
	);
}

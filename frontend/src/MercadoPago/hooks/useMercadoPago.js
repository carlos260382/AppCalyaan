// import { useEffect, useState } from "react";
// import useScript from "./useScript";
// import { formConfig } from "../components/formConfig.js";
// import { useSelector } from 'react-redux';

export default function useMercadoPago(props) {
	// const orderId = props.match.params.id;
	// console.log('esta es el ID', orderId)

	// //const [resultPayment, setResultPayment] = useState(undefined);

	// const orderDetails = useSelector(state => state.orderDetails);
	// const { order, loading, error } = orderDetails;

	// const userSignin = useSelector(state => state.userSignin);
	// const { userInfo } = userSignin;

	// const { MercadoPago } = useScript(
	//     "https://sdk.mercadopago.com/js/v2",
	//     "MercadoPago"
	// );

	// useEffect(() => {
	//     if (MercadoPago) {
	//         const mp = new MercadoPago('TEST-b0fd6bf6-2020-461d-94ce-eeddbcab6442');
	//         const cardForm = mp.cardForm({
	//             amount: "100.5",
	//             autoMount: true,
	//             form: formConfig,
	//             callbacks: {
	//                 onFormMounted: (error) => {
	//                     if (error)
	//                         return console.warn(
	//                             "Form Mounted handling error: ",
	//                             error
	//                         );
	//                 },

	//                 onSubmit: (event) => {
	//                     event.preventDefault();

	//                     const {
	//                         paymentMethodId: payment_method_id,
	//                         orderId: orderId,
	//                         cardholderEmail: email,
	//                         amount,
	//                         token,
	//                         installments,
	//                         identificationNumber,
	//                         identificationType,
	//                     } = cardForm.getCardFormData();

	//                     fetch(
	//                         `http://localhost:5000/process-payment`,
	//                         {
	//                             // entry point backend
	//                             method: "POST",
	//                             headers: {
	//                                  "Access-Control-Allow-Origin": "*",
	//                                  "Access-Control-Request-Method":
	//                                  "GET, POST, DELETE, PUT, OPTIONS",
	//                                 "Content-Type": "application/json",
	//                             },
	//                             body: JSON.stringify({
	//                                 token,
	//                                 orderId:orderId,
	//                                 payment_method_id,
	//                                 transaction_amount: amount,
	//                                 installments: Number(installments),
	//                                 description: "Descripción del producto",
	//                                 payer: {
	//                                     email,
	//                                     identification: {
	//                                         type: identificationType,
	//                                         number: identificationNumber,
	//                                     },
	//                                 },
	//                             }),
	//                         }
	//                     )
	//                         .then((res) => res.json())
	//                         .then((data) => setResultPayment(data))
	//                         .catch((err) => {
	//                             setResultPayment(err);
	//                         });
	//                 },
	//                 onFetching: (resource) => {
	//                     // Animate progress bar
	//                     const progressBar =
	//                         document.querySelector(".progress-bar");
	//                     progressBar.removeAttribute("value");

	//                     return () => {
	//                         progressBar.setAttribute("value", "0");
	//                     };
	//                 },
	//             },
	//         });
	//     }

	// }, [MercadoPago]);
	// console.log('resultado pago', resultPayment)
	// return resultPayment;
}

// export let buyCoins = (payload) => {
//     return async (dispatch) => {
//         try {
//             console.log(payload);
//             let buyCoins = await axios.post(
//                 `http://localhost:3001/api/coins/buy`,
//                 payload
//             );
//             return dispatch({
//                 type: BUY_COINS,
//                 payload: buyCoins,
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };
// ivan passalia08:53
// externalOrderRouter.post<{}, {}>("/buy", (req, res) => {
//   let product = req.body;
//   console.log(req.body);
//   let preference = {
//     items: [
//       {
//         title: product.title,
//         unit_price: product.buyprice,
//         quantity: 1,
//       },
//     ],
//     installments: 1,

//     back_urls: {
//       success: `http://localhost:3001/api/coins/pagos/${product.idaux}`,
//       failure: "http://localhost:3001/api/coins/buy",
//       pending: "http://localhost:3001/api/coins/buy",
//     },
//     auto_return: "

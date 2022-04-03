import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import { listTurns } from '../actions/turnAction';
//import { getTurn } from '../actions/turnAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';



export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  console.log('estas son las props', props)
  const [sdkReady, setSdkReady] = useState(false);
  //const [turnUser, setturnUser] = useState();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error, } = orderDetails;
  //const userSignin = useSelector((state) => state.userSignin);
  //const { userInfo } = userSignin;

  // const turnUser = useSelector((state) => state.turnGet);
  // const { turns } = turnUser;
  // console.log('este es turnUser', turns)
 
  const turnList = useSelector((state) => state.turnList);
  const { turns } = turnList;
console.log('todos los turnos', turns)


  const orderPay = useSelector((state) => state.orderPay);
  const {
    success: successPay,
  } = orderPay;
  
 
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    success: successDeliver,
  } = orderDeliver;
  
//  const getTurn = (orderId)=> {
//     return async function () {
//         try {
//             const {data} = await Axios.get(`http://localhost:5000/api/turn/${orderId}`);
//             return data
//         } catch (error) {
//             console.log('este es el error', error);
//         }
//     };
// }
  const dispatch = useDispatch();

  useEffect(() => {
    // const addPayPalScript = async () => {
    //   const { data } = await Axios.get('/api/config/paypal');
    //   const script = document.createElement('script');
    //   script.type = 'text/javascript';
    //   script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    //   script.async = true;
    //   script.onload = () => {
    //     setSdkReady(true);
    //   };
    //   document.body.appendChild(script);
      
    // };
    
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
      dispatch(listTurns());
      //getTurnsUser()
      //dispatch(getTurn(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          //addPayPalScript();
          
        } else {
          setSdkReady(true);
        }
      }
    }
    
    
  

    //setturnUser(getTurn(orderId))
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  // const successPaymentHandler = (paymentResult) => {
  //   dispatch(payOrder(order, paymentResult));
  // };
  
  // const deliverHandler = () => {
  //   dispatch(deliverOrder(order._id));
  // };

  
const irMercadoPago=()=> {
  props.history.push(`/mercadoPago/${order._id}`)
}

if(turns) {
  const turnUser = turns.find(e => e.orderId === orderId);
  return {
  turnDate : turnUser.day,
  turnHour : turnUser.hour,
  turnStatus : turnUser.status  
   }

//console.log('detallado', turnUser.turnDate)
  
}    
// const turnDate = turnUser.day
//     const turnHour = turnUser.hour
//     const turnStatus = turnUser.status
//console.log ('dia', turnDatail)
//     console.log ('hora', turnHour)
//     console.log ('stado', turnStatus)

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Pedido {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Envío</h2>
                <p>
                  <strong>Nombre:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Direccion: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                  Servicio Realizado en {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Servicio no realizado</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Pago</h2>
                <p>
                  <strong>Método:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                  Pagado en {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">No pagado</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Servicio Solicitado</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
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
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Resumen del pedido</h2>
              </li>
              <li>
                <div className="row">
                  <div>Elementos</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Transporte</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Impuesto</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total del pedido</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {/* {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )} */}
              {/* {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Entregar pedido
                  </button>
                </li>
              )} */}
              <button onClick={irMercadoPago}>Pagar</button>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h3>Día y hora del Turno Seleccionado</h3>
        <p>Fecha:</p>
        <p>Hora: </p>
      </div>
     
    </div>
  );
}

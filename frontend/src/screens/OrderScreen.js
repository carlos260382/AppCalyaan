/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import { listTurns } from '../actions/turnAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import styles from '../style/OrderScreen.module.css'

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';
import MercadoPagoForm from '../MercadoPago/components/MercadoPagoForm';



export default function OrderScreen(props) {
  const id = props.match.params.id;
  console.log('estas son las props', id)
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error, } = orderDetails;
  

  const turnList = useSelector((state) => state.turnList);
  const { turns, loadingTurn } = turnList;
  //console.log('lista turnos', turnList)

  //const turnUser = turns && turns.find(e => e.orderId === id);
  //console.log('este es el turno filtrado', turnUser)
  const orderPay = useSelector((state) => state.orderPay);
  const {
    success: successPay,
  } = orderPay;
  
 
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    success: successDeliver,
  } = orderDeliver;
  

  const dispatch = useDispatch();

  useEffect(() => {
    if (loadingTurn) { dispatch(listTurns()) } 
   
    if (
    
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== id)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      
      dispatch(detailsOrder(id));
      

    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          
          
        } else {
          setSdkReady(true);
        }
      }
    }
     
  }, [dispatch, id, sdkReady, successPay, successDeliver, order, turns, loadingTurn ]);

  const turnUser = turns && turns.find(e => e.orderId === id);
  console.log('este es turn Filter', turnUser)

  const irMercadoPago=()=> {
  props.history.push(`/mercadoPago/${order._id}`)
}

if (order)console.log('la order gral', order)

  return loading? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Pedido {order._id}</h1>
      <div className={styles.container}>
       <div className= {styles.turn}>
        <h3>Día y hora del Turno Seleccionado</h3>
        <p>Fecha: {turnUser? (turnUser.day):'' } </p>
        <p>Hora: {turnUser? (turnUser.hour):'' }</p>
        <p>Estado: {turnUser && turnUser.status? ('Aprobado'):'Pendiente' }</p>
      </div>
        <div>
          <ul>
            <li>
              <div className="card card-body">
                <p>
                  <strong>Nombre:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Direccion: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                <h2>Estado del servicio</h2>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                  Servicio Realizado en {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Pendiente por realizar</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <p>
                  <strong>Método de pago:</strong> {order.paymentMethod}
                </p>
                <h2>Estado</h2>
                {order.isPaid ? (
                  <MessageBox variant="success">
                  Pagado en {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Pendiente por pago</MessageBox>
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
                  <div>Servicios</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              {/* <li>
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
              </li> */}
              <li>
                <div className="row">
                  <div>
                    <strong>Valor total</strong>
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
              <div className={styles.pay}>
              {turnUser && turnUser.status  ? (<button className={styles.btn} onClick={irMercadoPago}>Pagar</button>):'Pendiente en ser aprobado el servicio por un profesional' }
              </div>
            </ul>
          </div>
        </div>
      </div> 
    </div>
  );
}
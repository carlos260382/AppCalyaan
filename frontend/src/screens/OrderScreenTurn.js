import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import styles from '../style/OrderScreenTurn.module.css'

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';
//import Calendar from '../components/Calendar';
import TurnScreen from './TurnScreen';
//import MercadoPagoForm from '../MercadoPago/components/MercadoPagoForm';


export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  //console.log('estas son las props', props)
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error, } = orderDetails;
  
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
   
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          //addPayPalScript();
          
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

// const irMercadoPago=()=> {
//   props.history.push(`/mercadoPago/${order._id}`)
// }


  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Solicitud # {order._id}</h1>
      <div className= {styles.container}>
      <TurnScreen order = {order} />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Información del solicitante</h2>
                <p>
                  <strong>Nombre:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Direccion: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {/* {order.isDelivered ? (
                  <MessageBox variant="success">
                  Entregado en {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">No entregado</MessageBox>
                )} */}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Servicio y/o Producto</h2>
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
                    <strong>Total del pedido</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

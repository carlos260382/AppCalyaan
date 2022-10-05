/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  listOrders,
  deliverOrder,
  payOrder,
} from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";
import styles from "../style/ServiceListScreen.module.css";

export default function OrderListScreen(props) {
  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : "" }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);

  const deleteHandler = (order) => {
    if (window.confirm("¿Desea eliminar el pedido?")) {
      dispatch(deleteOrder(order._id));
    }
  };

  const changeToDo = (order) => {
    if (window.confirm("¿Va confirmar que realizo el servicio?")) {
      dispatch(deliverOrder(order._id));
    }
    window.location.replace("");
  };

  const changePay = (order) => {
    if (window.confirm("¿Confirma que el servicio fue pagado?")) {
      dispatch(payOrder(order._id));
    }
    window.location.replace("");
  };

  return (
    <div className={styles.container}>
      <h1>Pedidos</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>FECHA</th>
              <th>TOTAL</th>
              <th>PAGADO</th>
              <th>REALIZADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                {/* <td>{order.user.name}</td> */}
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? "Pagado" : "No"}</td>
                <td>{order.isDelivered ? "Realizado" : "No"}</td>
                <td>
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Detalles
                  </button>
                  {userInfo.isAdmin ? (
                    <button
                      type="button"
                      className={styles.btn}
                      onClick={() => deleteHandler(order)}
                    >
                      Eliminar
                    </button>
                  ) : (
                    ""
                  )}

                  <button
                    type="button"
                    className={styles.btn}
                    onClick={() => changeToDo(order)}
                  >
                    Realizado
                  </button>
                  {userInfo.isAdmin ? (
                    <button
                      type="button"
                      className={styles.btn}
                      onClick={() => changePay(order)}
                    >
                      Pagado
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

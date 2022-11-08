/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTurn, deleteTurn } from "../actions/turnAction";
import styles from "../style/ServiceListScreen.module.css";

export default function TurnCard(props) {
  const { turn } = props;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const Turn = {
    id: turn._id,
    name: userInfo.name,
    img: userInfo.logo,
    seller: userInfo._id,
  };

  const nameService = turn.service?.map((servi) => {
    return `${servi.orderItems.name} $${servi.orderItems.price} `;
  });
  //   const priceService = turn.service.map((servi) => {
  //     return servi.price;
  //   });
  //   const qtyService = turn.service.map((servi) => {
  //     return servi.qty;
  //   });

  const handleAcceptor = () => {
    if (window.confirm("¿Desea aceptar el turno?")) {
      if (dispatch(updateTurn(Turn))) {
        setTimeout(() => {
          window.location.replace("");
        }, 2000);
      }
    }
    //
  };

  const handleDelete = () => {
    if (window.confirm("¿Desea eliminar el turno?")) {
      if (dispatch(deleteTurn(Turn.id))) {
        setTimeout(() => {
          window.location.replace("");
        }, 2000);
      }
    }
    // window.location.replace("");
  };
  console.log("turn de card", turn);
  return (
    <div className={styles.cards}>
      {userInfo.isSeller && !turn.status ? (
        <ul className={styles.ul} reversed>
          <li>
            <span>NOMBRE </span>
            {turn.user.name}
          </li>
          <li>
            <span>DIRECCION </span>
            {turn.shippingAddress.address}
          </li>
          <li>
            <span>FECHA </span>
            {turn.turn.day}
          </li>
          <li>
            <span>HORA </span>
            {turn.turn.hour}
          </li>
          <li>
            <span>SERVICIO </span>
            {nameService}
            {/* {priceService} */}
          </li>

          {/* <li>
          <span>PRECIO </span>
          {priceService}
        </li> */}

          <li>
            <span>ESTADO </span>
            {!turn.turn.status ? <p>Pendiente</p> : <p>Aceptado</p>}
          </li>

          <li>
            {" "}
            {!turn.turn.status ? (
              <button
                type="button"
                className={styles.btnTurn}
                onClick={() => handleAcceptor(Turn)}
              >
                Aceptar
              </button>
            ) : (
              ""
            )}
          </li>
        </ul>
      ) : (
        ""
      )}
      {userInfo.isAdmin ? (
        <ul className={styles.ul} reversed>
          <li>
            <span>NOMBRE </span>
            {turn.user.name}
          </li>
          <li>
            <span>DIRECCION </span>
            {turn.shippingAddress.address}
          </li>
          <li>
            <span>FECHA </span>
            {turn.turn.day}
          </li>
          <li>
            <span>HORA </span>
            {turn.turn.hour}
          </li>
          <li>
            <span>SERVICIO </span>
            {nameService}
          </li>
          {/* <li>
          <span>PRECIO </span>
          {priceService}
        </li> */}

          <li>
            <span>ESTADO </span>
            {!turn.turn.status ? <p>Pendiente</p> : <p>Aceptado</p>}
          </li>

          <li>
            {" "}
            {!turn.turn.status ? (
              <button
                type="button"
                className={styles.btnTurn}
                onClick={() => handleAcceptor(Turn)}
              >
                Aceptar
              </button>
            ) : (
              ""
            )}
            {userInfo.isAdmin ? (
              <button
                type="button"
                className={styles.btnTurn}
                onClick={() => handleDelete(Turn.id)}
              >
                Eliminar
              </button>
            ) : (
              ""
            )}
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}

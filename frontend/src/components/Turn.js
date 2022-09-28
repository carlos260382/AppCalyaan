/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTurn, deleteTurn } from "../actions/turnAction";
import styles from "../style/ServiceListScreen.module.css";

export default function Turn(props) {
  const { turn } = props;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const Turn = {
    id: turn._id,
    name: userInfo.name,
    img: userInfo.logo,
  };
  const nameService = turn.service.map((servi) => {
    return servi.name;
  });
  const priceService = turn.service.map((servi) => {
    return servi.price;
  });
  const qtyService = turn.service.map((servi) => {
    return servi.qty;
  });

  const handleAcceptor = () => {
    if (window.confirm("¿Desea aceptar el turno?")) {
      dispatch(updateTurn(Turn));
    }
    window.location.replace("");
  };

  const handleDelete = () => {
    if (window.confirm("¿Desea eliminar el turno?")) {
      dispatch(deleteTurn(Turn.id));
    }
    window.location.replace("");
  };
  console.log("usuario turn", userInfo);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>NOMBRE</th>
          <th>DIRECCION</th>
          <th>FECHA</th>
          <th>HORA</th>
          <th>SERVICIO</th>
          <th>PRECIO</th>
          <th>CANTIDAD</th>
          <th>ESTADO</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{turn.fullName}</td>
          <td>{turn.address}</td>
          <td>{turn.day}</td>
          <td>{turn.hour}</td>
          <td>{nameService}</td>
          <td>{priceService}</td>
          <td>{qtyService}</td>
          <td>{!turn.status ? <p>Pendiente</p> : <p>Aceptado</p>}</td>

          <td>
            {!turn.status ? (
              <button
                type="button"
                className={styles.btn}
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
                className={styles.btn}
                onClick={() => handleDelete(Turn.id)}
              >
                Eliminar
              </button>
            ) : (
              ""
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

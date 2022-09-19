/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Rating from "./Rating";
import styles from "../style/SearchScreen.module.css";
import verMas from "../assent/verMas.png";
import addCar from "../assent/addCart.svg";
import carAdd from "../assent/carAdd.svg";
import { addToCart } from "../actions/cartActions.js";

export default function Service(props) {
  const [actived, setActived] = useState(false);
  function separadorMillares(numero) {
    if (typeof numero != "number") {
      throw TypeError("El argumento debe ser un valor numérico.");
    }

    return numero.toLocaleString("en-US");
  }

  const dispatch = useDispatch();
  const history = useHistory();

  const addToCartHandler = (_id) => {
    let qty = 1;
    dispatch(addToCart(_id, qty));
    setActived(true);
  };

  const addToCartOrder = (_id) => {
    let qty = 1;
    dispatch(addToCart(_id, qty));
    history.push("/signin?redirect=cart");
  };

  useEffect(() => {
    setActived(false);
  }, []);

  const { service } = props;

  return (
    <div key={service._id} className={styles.card}>
      <Link to={`/service/${service._id}`}>
        <img src={service.image} alt={service.name} />
      </Link>

      <div className={styles.btnVerMas}>
        <h2>{service.name}</h2>
        {!actived ? (
          <img
            src={carAdd}
            alt={"img"}
            onClick={() => addToCartHandler(service._id)}
          />
        ) : (
          <img src={addCar} alt={"img"} />
        )}
        <Link to={`/service/${service._id}`}>
          <img src={verMas} alt={"img"} />
        </Link>
      </div>

      <div className={styles.price}>
        <div>
          <h3>${separadorMillares(service.price)}</h3>
        </div>
        <div>Puntos {service.points}</div>
      </div>

      <button
        className={styles.btnOrder}
        onClick={() => addToCartOrder(service._id)}
      >
        Hacer el pedido
      </button>
      <Rating rating={service.rating} numReviews={service.numReviews}></Rating>
    </div>
  );
}

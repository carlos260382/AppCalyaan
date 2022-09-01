/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "../style/OrderScreenTurn.module.css";
import Swal from "sweetalert2";

import {
  TURN_CREATE_SUCCESS,
  TURN_CREATE_FAIL,
} from "../constants/turnConstant.js";
import Axios from "axios";

export default function TurnScreen(props) {
  const history = useHistory();
  console.log("props de screen", props.order);

  const service = props.order.orderItems.map((service) => {
    return {
      name: service.name,
      price: service.price,
      qty: service.qty,
    };
  });

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  console.log("informacion de usuario", userInfo);
  const [turn, setTurn] = useState({});

  // useEffect(() => {
  //   setTurn({
  //     seller: props.order.seller,
  //     day: "",
  //     hour: "",
  //     status: false,
  //     user: props.order.user,
  //     orderId: props.order._id,
  //     fullName: props.order.shippingAddress.fullName,
  //     emailUser: userInfo.email,
  //     phoneUser: userInfo.phone,
  //     address: props.order.shippingAddress.address,
  //     city: props.order.shippingAddress.city,
  //     postalCode: props.order.shippingAddress.postalCode,
  //     country: props.order.shippingAddress.country,
  //     service,
  //   });
  // }, [
  //   props.order.seller,
  //   props.order.user,
  //   props.order._id,
  //   props.order.shippingAddress.fullName,
  //   userInfo.email,
  //   userInfo.phone,
  //   props.order.shippingAddress.address,
  //   props.order.shippingAddress.city,
  //   props.order.shippingAddress.postalCode,
  //   props.order.shippingAddress.country,
  //   service,
  // ]);

  const handleChange = (e) => {
    setTurn({
      ...turn,
      [e.target.name]: e.target.value,
      seller: props.order.seller,
      status: false,
      user: props.order.user,
      orderId: props.order._id,
      fullName: props.order.shippingAddress.fullName,
      emailUser: userInfo.email,
      phoneUser: userInfo.phone,
      address: props.order.shippingAddress.address,
      city: props.order.shippingAddress.city,
      postalCode: props.order.shippingAddress.postalCode,
      country: props.order.shippingAddress.country,
      service,
    });
    console.log("este es el turno", turn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setTurn({
    //   ...turn,
    //   seller: props.order.seller,
    //   status: false,
    //   user: props.order.user,
    //   orderId: props.order._id,
    //   fullName: props.order.shippingAddress.fullName,
    //   emailUser: userInfo.email,
    //   phoneUser: userInfo.phone,
    //   address: props.order.shippingAddress.address,
    //   city: props.order.shippingAddress.city,
    //   postalCode: props.order.shippingAddress.postalCode,
    //   country: props.order.shippingAddress.country,
    //   service,
    // });

    if (!turn.hour || !turn.day) {
      Swal.fire("debe seleccionar un dia y una hora");
    }

    try {
      //   const {
      //     userSignin: { userInfo },
      //   } = getState();
      const { data } = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/turn`,
        turn,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: TURN_CREATE_SUCCESS, payload: data.turn });

      if (data) {
        Swal.fire(
          "Turno creado con exito, recibira una notificación cuando el profesional tome el servicio"
        );
        history.push(`/order/${props.order._id}`);
      }
    } catch (error) {
      dispatch({
        type: TURN_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  console.log("turno creado", turn);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Elije la fecha y hora para agendar su turno</h1>

      <div>
        <label>Elije el dia</label>
        <input type="date" name="day" onChange={handleChange} />
      </div>

      <div>
        <label>Selecciona la Hora</label>

        <select name="hour" onChange={handleChange}>
          <option value="09:00 AM">09:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="01:00 PM">01:00 PM</option>
          <option value="02:00 PM">02:00 PM</option>
          <option value="03:00 PM">03:00 PM</option>
          <option value="04:00 PM">04:00 PM</option>
          <option value="05:00 PM">05:00 PM</option>
        </select>
      </div>

      <input className={styles.btn} type="submit" value="Enviar Turno" />
    </form>
  );
}

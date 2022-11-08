/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "../style/OrderScreenTurn.module.css";
import Swal from "sweetalert2";

import { TURN_CREATE_FAIL } from "../constants/turnConstant.js";
import {
  ORDER_UPDATE_SUCCESS,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants.js";
import Axios from "axios";

export default function TurnScreen(props) {
  const history = useHistory();

  // const service = props.order.orderItems.map((service) => {
  //   return {
  //     name: service.name,
  //     price: service.price,
  //     category: service.category,
  //     qty: service.qty,
  //   };
  // });
  const orderId = props.order._id;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

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
      // seller: props.order.seller,
      status: false,
      // user: props.order.user,
      // orderId: props.order._id,
      // fullName: props.order.shippingAddress.fullName,
      // emailUser: userInfo.email,
      // phoneUser: userInfo.phone,
      // address: props.order.shippingAddress.address,
      // neighborhood: props.order.shippingAddress.postalCode,
      // city: props.order.shippingAddress.city,
      // postalCode: props.order.shippingAddress.postalCode,
      // country: props.order.shippingAddress.country,
      // service,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!turn.hour || !turn.day) {
      Swal.fire("debe seleccionar un dia y una hora");
    }

    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/turn/${orderId}/turn`,
        // `${process.env.REACT_APP_API_BASE_URL}/api/turn`,
        turn,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: ORDER_UPDATE_SUCCESS, payload: data.turn });
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.turn });
      // dispatch({ type: TURN_CREATE_SUCCESS, payload: data.turn });
      console.log("data", data);
      if (data) {
        Swal.fire(
          "Turno creado con exito, recibira una notificación cuando el profesional tome el servicio"
        );

        setTimeout(() => {
          history.push(`/order/${props.order._id}`);
        }, 2000);
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

  console.log("turno", turn);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Aquí podras gestionar tu turno</h1>
      <label>
        Escoge el dia y la hora en la que deseas recibir el servicio
      </label>

      <div>
        <p>Dia</p>
        <input type="date" name="day" onChange={handleChange} />
      </div>

      <div>
        <p>Horarios disponibles</p>
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

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Swal from "sweetalert2";
import styles from "../style/SigninScreen.module.css";

export default function RegisterScreen(props) {
  console.log("ID de userFather", props);
  const { id } = props.match.params;
  console.log("el id", id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userfatherId, setUserfatherId] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire("Las contraseñas no coinciden");
    } else {
      dispatch(register(name, email, password, phone, userfatherId));
    }
  };
  useEffect(() => {
    if (id) setUserfatherId(id);
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo, id]);
  console.log("id del padre", userfatherId);
  return (
    <div className={styles.container}>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Crear una cuenta</h1>
          <h2>ID de quien lo refiere {id}</h2>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className={styles.mail}>
          <label htmlFor="phone">Numero de telefono</label>
          <input
            type="text"
            id="phone"
            placeholder="telefono"
            required
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>
        <div className={styles.mail}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className={styles.mail}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className={styles.mail}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className={styles.mail}>
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Registrarse
          </button>
        </div>
        <div>
          <label />
          <div>
            ¿Ya tienes una cuenta?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Inicia sesión</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

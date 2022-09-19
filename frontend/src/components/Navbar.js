/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// import SearchBox from "./SearchBox";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import { listServiceCategories } from "../actions/serviceActions.js";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import styles from "../style/Navbar.module.css";
import logo from "../assent/logo.png";

import carrito from "../assent/cart2.svg";
// import carritoBlanco from "../assent/cart1.svg";
import Asider from "./Asider";
// import { subscriptionUser } from "../actions/userActions.js";

function Navbar() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [searchIsOpen, setsearchIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState([]);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const serviceCategoryList = useSelector((state) => state.serviceCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = serviceCategoryList;
  useEffect(() => {
    dispatch(listServiceCategories());
    setsearchIsOpen(false);
  }, [dispatch]);

  //   const categoryImage = async () => {
  //     if (categories) {
  //       setNewCategory(categories);
  //     }
  //   };

  // -----------SendSuscription/ Config. Notification--------------------------

  // const PUBLIC_API_KEY_WEBPUSH =
  //   "BAzRub_L_TvQBFEfkJ1grFR5mXEXi6KrP7_S8Ss7EXaOL1pEjvjfKj2WOtEwidxw6RE4PKOl00dPcT_JLc4t3w0";

  // console.log("usuario suscrito", userInfo);
  // let subscriptions;
  // const subscription = async () => {
  //   //registro del serviceWorker
  //   try {
  //     const register = await navigator.serviceWorker.register("./worker.js", {
  //       scope: "./",
  //     });
  //     console.log("New Service Worker", register);

  //     // Listen Push Notifications

  //     subscriptions = await register.pushManager.subscribe({
  //       userVisibleOnly: true,
  //       applicationServerKey: urlBase64ToUint8Array(PUBLIC_API_KEY_WEBPUSH),
  //     });
  //     //envio al backend info usuario para subscribir
  //     console.log("suscripcion enviada", subscriptions);
  //     dispatch(subscriptionUser(userInfo, subscriptions));
  //   } catch (error) {
  //     console.log("error subscription", error);
  //   }
  // };
  // if (userInfo && !userInfo.subscribed) {
  //   subscription();
  // }

  // function urlBase64ToUint8Array(base64String) {
  //   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  //   const base64 = (base64String + padding)
  //     .replace(/-/g, "+")
  //     .replace(/_/g, "/");

  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);

  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   return outputArray;
  // }

  return (
    <div className={styles.all}>
      <div className={styles.container}>
        <Asider />
        <div className={styles.containerMenu}>
          <div className={styles.logo}>
            <NavLink to="/">
              <img src={logo} alt="imagen principal" />
            </NavLink>
          </div>

          <div className={styles.menu}>
            <a
              href="https://calyaan.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3> Inicio </h3>
            </a>
            <a
              href="https://calyaan.com/empresarial/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>Servicios Corporativos</h3>
            </a>
            <a
              href="https://calyaan.com/blog/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3> Blog</h3>
            </a>
            <a
              href="https://calyaan.com/quienes-somos/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3> Nosotros</h3>
            </a>
            <a
              href="https://calyaan.com/contactanos/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3> Contacto</h3>
            </a>
          </div>
        </div>
        <div>
          {!userInfo ? (
            <div className={styles.containerBtn}>
              <NavLink to="/register/01">
                <div className={styles.btnRegister}>Registrarme</div>
              </NavLink>
              <NavLink to="/signin">
                {" "}
                <div className={styles.btn}>Iniciar sesión</div>
              </NavLink>
            </div>
          ) : (
            ""
          )}
        </div>

        {userInfo ? (
          <div className={styles.signin}>
            {userInfo ? (
              <div className="dropdown">
                <NavLink to="#" className={styles.nav}>
                  {userInfo.phone} <i></i>{" "}
                </NavLink>
                <ul className="dropdown-content">
                  <li>
                    <NavLink to="/profile">Perfil de Usuario</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orderhistory">Historial de pedidos</NavLink>
                  </li>
                  <li>
                    <NavLink to="#signout" onClick={signoutHandler}>
                      Desconectar
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
            {userInfo && userInfo.isSeller && (
              <div>
                <div className="dropdown">
                  <NavLink to="#admin" className={styles.nav}>
                    Profesional <i></i>
                  </NavLink>
                  <ul className="dropdown-content">
                    <li>
                      <NavLink to="/servicelist/seller">Servicios</NavLink>
                    </li>
                    <li>
                      <NavLink to="/turnlist">Turnos</NavLink>
                    </li>
                    <li>
                      <NavLink to="/orderlist/seller">Pedidos</NavLink>
                    </li>
                  </ul>
                </div>
                {/* <div>
								<img src={userInfo.logo} alt='' className={styles.imgSeller} />
							</div>{' '} */}
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <NavLink to="#admin" className={styles.nav}>
                  Admin <i></i>
                </NavLink>
                <ul className="dropdown-content">
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink to="/servicelist">Servicios</NavLink>
                  </li>
                  <li>
                    <NavLink to="/turnlist">Turnos</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orderlist">Pedidos</NavLink>
                  </li>
                  <li>
                    <NavLink to="/userlist">Usuarios</NavLink>
                  </li>
                  <li>
                    <NavLink to="/support">Soporte</NavLink>
                  </li>
                </ul>
              </div>
            )}
            {userInfo ? (
              <div className={styles.container2}>
                <div className={styles.carrito}>
                  <NavLink to="/cartOnly">
                    <img src={carrito} alt="description" />

                    {cartItems.length > 0 && (
                      <span className={styles.badge}>{cartItems.length}</span>
                    )}
                  </NavLink>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.container1}>
        <div className={styles.category}>
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : categories ? (
            categories.map((c) => (
              <li key={c}>
                <NavLink to={`/search/category/${c}`}>{c}</NavLink>
              </li>
            ))
          ) : (
            ""
          )}
        </div>
        {/* <div className={styles.contenSearch}>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;

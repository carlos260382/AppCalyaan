/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../actions/userActions";
import { listServiceCategories } from "../actions/serviceActions.js";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import styles from "../style/UserEditScreen.module.css";

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [category, setCategory] = useState([]);
  const [orders, setOrders] = useState();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const serviceCategoryList = useSelector((state) => state.serviceCategoryList);
  const { categories } = serviceCategoryList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/userlist");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
      if (Array.isArray(user.isSeller.categories)) {
        setCategory(user.isSeller.categories);
      }
    }

    dispatch(listServiceCategories());

    // eslint-disable-next-line react/prop-types
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(
      updateUser({ _id: userId, name, email, isSeller, isAdmin, category })
    );
  };

  const handleChange = (evento) => {
    setCategory((category) => [...category, evento]);
  };

  const getOrder = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/orders/professional/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log("data", data);
      setOrders(data);
      setLoadingOrder(true);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("ordenes", orders);
  function separadorMillares(numero) {
    if (typeof numero != "number") {
      throw TypeError("El argumento debe ser un valor numérico.");
    }

    return numero.toLocaleString("en-US");
  }

  const totalOrders = (orders) => {
    for (let i = 0; i < orders?.length; i++) {
      return {
        itemsPrice: orders[i].itemsPrice + orders[i + 1].itemsPrice,
        totalPrice: orders[i].totalPrice + orders[i + 1].totalPrice,
        taxPrice: orders[i].taxPrice + orders[i + 1].taxPrice,
      };
    }
  };
  const totalOrdersPrice = totalOrders(orders);

  console.log("prices", totalOrdersPrice);
  // const totalCalyaan = orders?.map((order) => order.totalPrice++);

  // const totalProfessional = orders?.map((order) => order.taxPrice++);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <div>
          <h1>Editar Usuario {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Correo Electronico</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="isSeller">Es Profesional</label>
              <input
                id="isSeller"
                type="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              ></input>
            </div>
            <div>
              <label htmlFor="isAdmin">Es Administrador</label>
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
            </div>
          </>
        )}
        {user && user.isSeller ? (
          <div>
            <label htmlFor="category">
              Seleccione las categorias de los servicios que presta
            </label>

            {categories?.map((item, index) => (
              <div key={index}>
                <input
                  value={item}
                  type="checkbox"
                  onChange={(e) => handleChange(e.target.value)}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        <div>
          <button className={styles.btn} type="submit">
            Actualizar
          </button>
        </div>
      </form>
      {user && user.isSeller ? (
        <button className={styles.btnSeller} onClick={() => getOrder()}>
          Obtener pedidos
        </button>
      ) : (
        ""
      )}
      {loadingOrder ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>FECHA PEDIDO</th>
                <th>TOTAL CALYAAN</th>
                <th>TOTAL PROFESIONAL</th>
                <th>TOTAL DEL PEDIDO</th>
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

                  <td>${separadorMillares(order.totalPrice)}</td>
                  <td>${separadorMillares(order.taxPrice)}</td>
                  <td>${separadorMillares(order.itemsPrice)}</td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>TOTAL CALYAAN</th>
                <th>TOTAL PROFESIONAL</th>
                <th>TOTAL GENERAL PEDIDOS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  ${separadorMillares(parseInt(totalOrdersPrice.totalPrice))}
                </td>
                <td>
                  ${separadorMillares(parseInt(totalOrdersPrice.taxPrice))}
                </td>
                <td>
                  ${separadorMillares(parseInt(totalOrdersPrice.itemsPrice))}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

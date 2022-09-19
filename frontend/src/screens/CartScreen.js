/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import styles from "../style/CartScreen.module.css";
import ShippingAddressScreen from "./ShippingAddressScreen";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  console.log("props de cart", props);
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  //   const checkoutHandler = () => {
  //     props.history.push("/signin?redirect=shipping");
  //   };
  return (
    <div className={styles.container}>
      {cartItems.length > 0 ? <ShippingAddressScreen /> : ""}

      <div className={styles.col1}>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Carrito esta vacio <Link to="/">Ir a Tienda</Link>
          </MessageBox>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.product} className={styles.cart}>
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.img}
                  ></img>
                </div>
                <div className={styles.nameProduc}>
                  <Link to={`/service/${item.product}`}>{item.name}</Link>

                  <div className={styles.price}>${item.price}</div>

                  <button
                    type="button"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

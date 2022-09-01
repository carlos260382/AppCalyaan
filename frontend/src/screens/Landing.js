/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox.js";
import MessageBox from "../components/MessageBox.js";
import SearchBox from "../components/SearchBox.js";
import styles from "../style/Landing.module.css";
import catDepilacion from "../assent/catDepilacion.png";
import catMaquillaje from "../assent/catMaquillaje.png";
import catMasajes from "../assent/catMasaje.png";
import catPeluqueria from "../assent/catPeluqueria.png";
import catUñas from "../assent/catUñas.png";
import catSpa from "../assent/catSpa.jpg";
import catYoga from "../assent/catYoga.jpg";
import cart3 from "../assent/cart3.svg";
import agenda from "../assent/agenda.svg";
import card from "../assent/card.svg";
import home from "../assent/home.svg";

export default function Landing() {
  const serviceCategoryList = useSelector((state) => state.serviceCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = serviceCategoryList;

  const [newCategory, setNewCategory] = useState([]);

  // const userSignin = useSelector(state => state.userSignin);
  // const { userInfo } = userSignin;

  const images = {
    Depilación: catDepilacion,
    Maquillaje: catMaquillaje,
    Masajes: catMasajes,
    Peluquería: catPeluqueria,
    Spa: catSpa,
    Uñas: catUñas,
    Yoga: catYoga,
  };

  let categoriesImage;
  const categoryImage = async () => {
    if (categories) {
      categoriesImage = categories?.map((c) => ({
        name: c,
        image: images[c],
      }));
    }

    return setNewCategory(categoriesImage);
  };

  useEffect(() => {
    categoryImage();
  }, [categories]);

  return (
    <div className={styles.container}>
      <div className={styles.contenSearch}>
        <span>Encuentra el servicio que estas necesitando</span>
        <div>
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
        </div>
      </div>
      <h1>Nuestros Servicios</h1>
      {/* {userInfo ? <h2>Puntos Acumulados {userInfo.pointsUser} </h2> : ''} */}
      <div className={styles.container1}>
        {loadingCategories ? (
          <LoadingBox></LoadingBox>
        ) : errorCategories ? (
          <MessageBox variant="danger">{errorCategories}</MessageBox>
        ) : (
          newCategory?.map((c) => (
            <li key={c.name} className={styles.li}>
              <NavLink
                to={`/search/category/${c.name}`}
                className={styles.card}
              >
                <img src={c.image} alt="" className={styles.img} />
                <div className={styles.textCard}>
                  <h3>{c.name}</h3>

                  <button
                    to={`/search/category/${c.name}`}
                    className={styles.btn}
                  >
                    Ver mas
                  </button>
                </div>
              </NavLink>
            </li>
          ))
        )}
      </div>

      <h1>Como Funciona</h1>

      <div className={styles.steps}>
        <div className={styles.steps1}>
          <img src={cart3} alt="" className={styles.cart3} />
          <h3 className={styles.text}>Escoge tu servicio</h3>
          <span className={styles.text}>
            Escoge el servicio que deseas, entre varias categorias
          </span>
        </div>
        <div className={styles.steps1}>
          <img src={agenda} alt="" className={styles.cart3} />
          <h3 className={styles.text}>Agenda tu turno</h3>
          <span className={styles.text}>
            Gestionarás tu turno en muy simples pasos.
          </span>
        </div>
        <div className={styles.steps1}>
          <img src={card} alt="" className={styles.cart3} />
          <h3 className={styles.text}>Realiza el pago</h3>
          <span className={styles.text}>
            Podrás realizar tu pago una vez que el profesional tome el servicio.
            De esta forma asegurás el turno.
          </span>
        </div>
        <div className={styles.steps1}>
          <img src={home} alt="" className={styles.cart3} />
          <h3 className={styles.text}>Disfruta tu servicio en casa</h3>
          <span>
            Recibirás el servicio en la comodidad y tranquilidad de tu hogar.
          </span>
        </div>
      </div>
    </div>
  );
}

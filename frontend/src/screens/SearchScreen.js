/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import SearchBox from "../components/SearchBox";
import { listService } from "../actions/serviceActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Service from "../components/Service.js";

import styles from "../style/SearchScreen.module.css";

export default function SearchScreen(props) {
  const [filter, setFilter] = useState({
    order: "newest",
    rating: 0,
  });

  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const serviceList = useSelector((state) => state.serviceList);
  const { loading, error, services, page, pages } = serviceList;

  const serviceCategoryList = useSelector((state) => state.serviceCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = serviceCategoryList;

  useEffect(() => {
    dispatch(
      listService({
        pageNumber,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };

  const getAllUrl = (filter) => {
    const filterCategory = filter.category || category;
    return `/search/category/${filterCategory}/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1`;
  };

  const getFilter = () => {
    props.history.push(getFilterUrl(filter));
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerSort}>
        <div>
          <label>Precio</label>

          <select
            name="precio"
            placeholder="Seleccionar1"
            onChange={(e) => {
              setFilter({ order: e.target.value });
            }}
          >
            <option>seleccionar</option>
            <option value="lowest"> De menor a mayor</option>
            <option value="highest">De mayor a menor</option>
          </select>
        </div>

        <div>
          <label>Experiencia</label>
          <select
            onChange={(e) => {
              setFilter({ rating: e.target.value });
            }}
          >
            <option value="0">seleccionar</option>
            <option value="5">Calificados con 5 estrellas</option>
            <option value="4">Calificados con 4 estrellas</option>
            <option value="3">Calificados con 3 estrellas</option>
          </select>
        </div>
        <button onClick={getFilter}>Filtrar</button>
      </div>

      <div className={styles.container2}>
        <div className={styles.col1}>
          <h3>Buscar por categoria</h3>

          <div className={styles.category}>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <div>
                <Link
                  className={category === "all" ? "active" : ""}
                  to={getAllUrl({ category: "all" })}
                >
                  <h3>Seleccionar todo</h3>
                </Link>

                <ul>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        className={c === category ? "active" : ""}
                        to={getFilterUrl({ category: c })}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className={styles.col2}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {services.length === 0 && (
                <MessageBox>
                  No se Encontro Ningún Servicio, pero le podemos recomendar
                  muchos mas que encontrara en las demas categorias
                </MessageBox>
              )}
              <div className={styles.cards}>
                {services.map((service) => (
                  <Service key={service._id} service={service}></Service>
                ))}
              </div>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? "active" : ""}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

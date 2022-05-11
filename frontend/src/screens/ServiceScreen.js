import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsService } from '../actions/serviceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { SERVICE_REVIEW_CREATE_RESET } from '../constants/serviceConstants';
import styles from '../style/ServiceScreen.module.css'

export default function ServiceScreen(props) {
  const dispatch = useDispatch();
  const serviceId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const serviceDetails = useSelector((state) => state.serviceDetails);
  const { loading, error, service } = serviceDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const serviceReviewCreate = useSelector((state) => state.serviceReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = serviceReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: SERVICE_REVIEW_CREATE_RESET });
    }
    dispatch(detailsService(serviceId));
  }, [dispatch, serviceId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${serviceId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(serviceId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Por favor ingrese comentario y calificación');
    }
  };

  console.log ('servicio este es el detallado', serviceDetails )
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Volver al Resultado</Link>
          <div className= {styles.container1}>
            <div className={styles.col1}>
              <img
                src={service.image}
                alt={service.name}
              ></img>
            </div>
            <div className= {styles.col2}>
              <ul>
                <li>
                  <h1>{service.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={service.rating}
                    numReviews={service.numReviews}
                  ></Rating>
                </li>
                <li>Pirce : ${service.price}</li>
                <li>
                  Description:
                  <p className={styles.p}>{service.description}</p>
                </li>
              </ul>
            </div>
            <div className={styles.col3}>
              <div className="card card-body">
                <ul>
                  <li>
                    Vendedor{' '}
                    <h2>
                      {/* <Link to={`/seller/${service.seller._id}`}>
                        {service.seller.name}
                      </Link> */}
                    </h2>
                    {/* <Rating
                      rating={service.seller.seller.rating}
                      numReviews={service.seller.seller.numReviews}
                    ></Rating> */}
                  </li>
                  <li>
                    <div className="row">
                      <div>Precio</div>
                      <div className="price">${service.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Estado</div>
                      <div>
                        {service.countInStock > 0 ? (
                          <span className="success">Disponible</span>
                        ) : (
                          <span className="danger">No disponible</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {service.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Cant.</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(service.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className= {styles.btn}
                        >
                          Agregar al carrito
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.reseñas}>
            <h2>Reseñas</h2>
            {service.reviews.length === 0 && (
              <MessageBox>No hay Reseñas</MessageBox>
            )}
            <ul>
              {service.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            
            </ul>
              </div>
              <div className= {styles.form}>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div>
                      <h2>Escribe una reseña</h2>
                    </div>
                    <div className= {styles.rating}>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Bajo</option>
                        <option value="2">2- Medio</option>
                        <option value="3">3- Bueno</option>
                        <option value="4">4- Muy Bueno</option>
                        <option value="5">5- Excelente</option>
                      </select>
                    </div>
                    <div className= {styles.textarea}>
                      <label htmlFor="comment">Comentario</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className= {styles.btnForm} type="submit">
                      Enviar
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Por favor <Link to="/signin">Inicie sesión</Link> Para escribir una reseña
                  </MessageBox>
                )}
                </div>          
        </div>
      )}
    </div>
  );
}

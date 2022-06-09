import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
//import { Carousel } from 'react-responsive-carousel';
import Turn from '../components/Turn';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listTurns } from '../actions/turnAction';
import styles from '../style/ServiceListScreen.module.css'
//import { listTopSellers } from '../actions/userActions';
//import { Link } from 'react-router-dom';

export default function TurnListScreen() {
  const dispatch = useDispatch();
  const turnList = useSelector((state) => state.turnList);
  const { loadingTurn, error, turns } = turnList;

  // const userTopSellersList = useSelector((state) => state.userTopSellersList);
  // const {
  //   loading: loadingSellers,
  //   error: errorSellers,
  //   users: sellers,
  // } = userTopSellersList;

  useEffect(() => {
   dispatch(listTurns());
    //dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <h2>Lista de Turnos</h2>
      {/* {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No se encontro ningun vendedor</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )} */}
      
      {loadingTurn ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {turns.length === 0 && <MessageBox>No se encontró ningún turno</MessageBox>}
          <div className="row center">
            {turns.map((turn) => (
              <Turn key={turn._id} turn={turn}></Turn>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
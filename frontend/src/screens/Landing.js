import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NavLink } from 'react-router-dom';
import styles from '../style/Landing.module.css';
import service1 from '../assent/services1.jpg';
//import product1 from '../assent/Products1.jpg';
//import testimonio1 from '../assent/testimonio1.png';
//import {subscription} from '../webPush/main.js'

export default function Landing (){
	// useEffect(()=>{
	// 	if ("serviceWorker" in navigator) {
	// 		subscription().catch(err => console.log(err));
	// 	  }

	// 	subscription().catch(err => console.log('este es error subscription', err));

	// },[]) 
return(
<div className={styles.container}>

{/* <div className={styles.Card1}>
<NavLink to="/product">
<img src={product1} alt="" className={styles.product1}/>
<h2>Productos de Belleza y Salud</h2>
</NavLink>
</div> */}

<div className={styles.Card}>
<NavLink to="/service">
<img src={service1} alt="" className={styles.service1}/>
<h2>Servicios de Belleza y Cuidado Personal</h2>
</NavLink>
</div>

<h2>Como Funciona</h2>

<div className={styles.steps}>

<div> <h3>Paso 1</h3>Escoge el servicio que deseas; entre belleza y cuidado personal</div>
<div> <h3>Paso 2</h3> Agenda tu turno en los horarios y días disponibles</div>
<div> <h3>Paso 3</h3> Realiza el pago a traves de nuestro servicio de pago seguro</div>
<div> <h3>Paso 4</h3> Disfruta tu servicio en casa</div>

</div>
{/* 
<h2>Testimonios</h2>
<div>
<img src={testimonio1} alt="" className={styles.testimonio1}/>
<p>Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica </p>
</div> */}
</div>
)
};
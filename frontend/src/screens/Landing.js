import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NavLink } from 'react-router-dom';
import styles from './Landing.module.css';
import service1 from '../assent/services1.jpg';
import product1 from '../assent/Products1.jpg';
import testimonio1 from '../assent/testimonio1.png';
 import {subscription} from '../webPush/main.js';  

export default function Landing (){

	useEffect(()=>{
		if ("serviceWorker" in navigator) {
			subscription().catch(err => console.log(err));
		  }

		//subscription().catch(err => console.log('este es error subscription', err));

	},[]) 
return(
<div className={styles.container}>
<div className={styles.container1}>
<div className={styles.Card1}>
<NavLink to="/product">
<img src={product1} alt="" className={styles.product1}/>
<h2>Productos de Belleza y Salud al por mayor</h2>
<ul> 
   	<li>Ideal para Negocios</li> 
   	<li>Precios al por mayor</li> 
   	<li>Surte tu tienda sin salir de casa</li> 
</ul>
</NavLink>
<button className={styles.btn} to="/product">Conoce</button>
</div>

<div className={styles.Card2}>
<NavLink to="/service">
<img src={service1} alt="" className={styles.service1}/>
<h2>Servicios de Cuidado Personal y Belleza</h2>
<ul> 
   	<li>SPA/Yoga</li> 
   	<li>Peluqueria/Barberia</li> 
   	<li>Maquillaje</li> 
</ul>
</NavLink>
<button className={styles.btn2} to="/service">Conoce</button>
</div>
</div>
<h2>Como Funciona</h2>
<div>
<h2>1. Para Productos:</h2>
<ul>
<li>Para productos al por mayor</li>
<li>Para productos al por mayor</li>
<li>Para productos al por mayor</li>
</ul>
</div>

<div>
<h2>2. Para Servicios:</h2>
<ul>
<li>Escoge el servicio que deseas; entre la gran variedad de cuidado personal, belleza y salud.</li>
<li>Agenda tu turno en los horarios y días disponibles.</li>
<li>Realiza el pago a traves de nuestro servicio de pago seguro</li>
<li>Disfruta tu servicio en casa</li>
</ul>    
</div>

<h2>Testimonios</h2>
<div>
<img src={testimonio1} alt="" className={styles.testimonio1}/>
<p>Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica </p>
</div>
</div>
)
};
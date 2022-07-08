/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';

import styles from '../style/Landing.module.css';
import catBarberia from '../assent/catBarberia.png';
import catDepilacion from '../assent/catDepilacion.png';
import catMaquillaje from '../assent/catMaquillaje.png';
import catMasajes from '../assent/catMasaje.png';
import catPeluqueria from '../assent/catPeluqueria.png';
import catUñas from '../assent/catUñas.png';
import catSpa from '../assent/catSpa.jpg';
import catYoga from '../assent/catYoga.jpg';
import entrarPng from '../assent/entrar.png';

// import service1 from '../assent/services1.jpg';

export default function Landing() {
	const serviceCategoryList = useSelector(state => state.serviceCategoryList);
	const {
		loading: loadingCategories,
		error: errorCategories,
		categories,
	} = serviceCategoryList;

	console.log('categoria', categories);
	const images = {
		Barbería: catBarberia,
		Depilación: catDepilacion,
		Maquillaje: catMaquillaje,
		Masajes: catMasajes,
		Peluquería: catPeluqueria,
		Spa: catSpa,
		Uñas: catUñas,
		Yoga: catYoga,
	};

	const categoriesImage = categories?.map(c => ({ name: c, image: images[c] }));
	console.log('categoriesImage', categoriesImage);
	return (
		<div className={styles.container}>
			<h1>Servicios</h1>
			<div className={styles.container1}>
				{loadingCategories ? (
					<LoadingBox></LoadingBox>
				) : errorCategories ? (
					<MessageBox variant='danger'>{errorCategories}</MessageBox>
				) : (
					categoriesImage?.map(c => (
						<li key={c.name} className={styles.li}>
							<NavLink
								to={`/search/category/${c.name}`}
								className={styles.card}
							>
								<img src={c.image} alt='' className={styles.img} />
								<div className={styles.textCard}>
									<h2>{c.name}</h2>
									<div className={styles.textIcon}>
										<span>Ver mas</span>
										<img src={entrarPng} alt='' className={styles.entrarPng} />
									</div>
								</div>
							</NavLink>
						</li>
					))
				)}
			</div>

			<h1>Como Funciona</h1>

			<div className={styles.steps}>
				<div className={styles.steps1}>
					{' '}
					<span className={styles.text}>Escoge el servicio</span>
					<span className={styles.arrow}></span>
				</div>
				<div className={styles.steps1}>
					{' '}
					<span className={styles.text}>Agenda tu turno</span>
					<span className={styles.arrow}></span>
				</div>
				<div className={styles.steps1}>
					{' '}
					<span className={styles.text}>Realiza el pago</span>
					<span className={styles.arrow}></span>
				</div>
				<div className={styles.steps2}>
					{' '}
					<span>Disfruta tu servicio en casa</span>
				</div>
			</div>
		</div>
	);
}

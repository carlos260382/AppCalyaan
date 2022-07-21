/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import styles from '../style/SearchScreen.module.css';

export default function Service(props) {
	const { service } = props;
	console.log('estos son los servicios', service);
	return (
		<div key={service._id} className={styles.card}>
			<Link to={`/service/${service._id}`}>
				<h2>{service.name}</h2>
			</Link>
			<div>
				<Link to={`/service/${service._id}`}>
					<img src={service.image} alt={service.name} />
				</Link>
				<div className={styles.price}>${service.price}</div>
				<div className={styles.price}>Puntos {service.points}</div>
			</div>
			<Rating rating={service.rating} numReviews={service.numReviews}></Rating>
		</div>
	);
}

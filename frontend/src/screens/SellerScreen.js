/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listService } from '../actions/serviceActions.js';
import { detailsUser } from '../actions/userActions.js';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Service from '../components/Service.js';
import Rating from '../components/Rating';

export default function SellerScreen(props) {
	const sellerId = props.match.params.id;
	const userDetails = useSelector(state => state.userDetails);
	const { loading, error, user } = userDetails;

	const serviceList = useSelector(state => state.serviceList);
	const {
		loading: loadingService,
		error: errorService,
		services,
	} = serviceList;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(detailsUser(sellerId));
		dispatch(listService({ seller: sellerId }));
	}, [dispatch, sellerId]);
	return (
		<div className='row top'>
			<div className='col-1'>
				{loading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant='danger'>{error}</MessageBox>
				) : (
					<ul className='card card-body'>
						<li>
							<div className='row start'>
								<div className='p-1'>
									<img
										className='small'
										src={user.seller.logo}
										alt={user.seller.name}
									></img>
								</div>
								<div className='p-1'>
									<h1>{user.seller.name}</h1>
								</div>
							</div>
						</li>
						<li>
							<Rating
								rating={user.seller.rating}
								numReviews={user.seller.numReviews}
							></Rating>
						</li>
						<li>
							<a href={`mailto:${user.email}`}>Contacte al Vendedor</a>
						</li>
						<li>{user.seller.description}</li>
					</ul>
				)}
			</div>
			<div className='col-3'>
				{loadingService ? (
					<LoadingBox></LoadingBox>
				) : errorService ? (
					<MessageBox variant='danger'>{errorService}</MessageBox>
				) : (
					<>
						{services.length === 0 && (
							<MessageBox>No se encontró ningún servicio</MessageBox>
						)}
						<div className='row center'>
							{services.map(service => (
								<Service key={service._id} service={service}></Service>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

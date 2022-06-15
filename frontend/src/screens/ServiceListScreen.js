/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styles from '../style/ServiceListScreen.module.css';
import {
	createService,
	deleteService,
	listService,
} from '../actions/serviceActions';
import {
	SERVICE_CREATE_RESET,
	SERVICE_DELETE_RESET,
} from '../constants/serviceConstants';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ServiceListScreen(props) {
	const { pageNumber = 1 } = useParams();

	const sellerMode = props.match.path.indexOf('/seller') >= 0;
	const serviceList = useSelector(state => state.serviceList);
	const { loading, error, services, page, pages } = serviceList;

	const serviceCreate = useSelector(state => state.serviceCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		service: createdService,
	} = serviceCreate;

	const serviceDelete = useSelector(state => state.serviceDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = serviceDelete;
	const userSignin = useSelector(state => state.userSignin);
	const { userInfo } = userSignin;
	const dispatch = useDispatch();

	useEffect(() => {
		if (successCreate) {
			dispatch({ type: SERVICE_CREATE_RESET });
			props.history.push(`/service/${createdService._id}/edit`);
		}
		if (successDelete) {
			dispatch({ type: SERVICE_DELETE_RESET });
		}
		dispatch(
			listService({ seller: sellerMode ? userInfo._id : '', pageNumber })
		);
	}, [
		createdService,
		dispatch,
		props.history,
		sellerMode,
		successCreate,
		successDelete,
		userInfo._id,
		pageNumber,
	]);

	const deleteHandler = service => {
		if (window.confirm('¿Desea eliminar el servicio?')) {
			dispatch(deleteService(service._id));
		}
	};

	const createHandler = () => {
		dispatch(createService());
	};
	console.log('este es el service', serviceList);
	console.log('este es el error', error);

	return (
		<div className={styles.container}>
			<div className='row'>
				<h1>Servicios</h1>
				<button className={styles.btnadd} onClick={createHandler}>
					Crear Servicios
				</button>
			</div>

			{loadingDelete && <LoadingBox></LoadingBox>}
			{errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}

			{loadingCreate && <LoadingBox></LoadingBox>}
			{errorCreate && <MessageBox variant='danger'>{errorCreate}</MessageBox>}
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant='danger'>{error}</MessageBox>
			) : (
				<>
					<table className='table'>
						<thead>
							<tr>
								<th className={styles.none}>ID</th>
								<th>NOMBRE</th>
								<th>PRECIO</th>
								<th>CATEGORIA</th>
								<th>MARCA</th>
								<th>ACCIONES</th>
							</tr>
						</thead>
						<tbody>
							{services.map(service => (
								<tr key={service._id}>
									<td className={styles.none}>{service._id}</td>
									<td>{service.name}</td>
									<td>{service.price}</td>
									<td>{service.category}</td>
									<td>{service.brand}</td>
									<td>
										<button
											type='button'
											className={styles.btn}
											onClick={() =>
												props.history.push(`/service/${service._id}/edit`)
											}
										>
											Editar
										</button>
										<button
											type='button'
											className={styles.btn}
											onClick={() => deleteHandler(service)}
										>
											Eliminar
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className='row center pagination'>
						{[...Array(pages).keys()].map(x => (
							<Link
								className={x + 1 === page ? 'active' : ''}
								key={x + 1}
								to={`/servicelist/pageNumber/${x + 1}`}
							>
								{x + 1}
							</Link>
						))}
					</div>
				</>
			)}
		</div>
	);
}

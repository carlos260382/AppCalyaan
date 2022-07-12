/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, Route } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import { listService } from '../actions/serviceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Service from '../components/Service.js';
import Rating from '../components/Rating';

import styles from '../style/SearchScreen.module.css';
import { ratings } from '../utils';

export default function SearchScreen(props) {
	const {
		name = 'all',
		category = 'all',
		min = 0,
		max = 0,
		rating = 0,
		order = 'newest',
		pageNumber = 1,
	} = useParams();
	const dispatch = useDispatch();
	const serviceList = useSelector(state => state.serviceList);
	const { loading, error, services, page, pages } = serviceList;

	const serviceCategoryList = useSelector(state => state.serviceCategoryList);
	const {
		loading: loadingCategories,
		error: errorCategories,
		categories,
	} = serviceCategoryList;
	useEffect(() => {
		dispatch(
			listService({
				pageNumber,
				name: name !== 'all' ? name : '',
				category: category !== 'all' ? category : '',
				min,
				max,
				rating,
				order,
			})
		);
	}, [category, dispatch, max, min, name, order, rating, pageNumber]);

	const getFilterUrl = filter => {
		const filterPage = filter.page || pageNumber;
		const filterCategory = filter.category || category;
		const filterName = filter.name || name;
		const filterRating = filter.rating || rating;
		const sortOrder = filter.order || order;
		const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
		const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
		return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
	};
	return (
		<div className={styles.container}>
			<div className={styles.container1}>
				<div>
					<h3> Ordenar los servicios por </h3>
					<select
						value={order}
						onChange={e => {
							props.history.push(getFilterUrl({ order: e.target.value }));
						}}
					>
						<option value='newest'>Llegadas mas recientes</option>
						<option value='lowest'> Del precio mas bajo al mas alto</option>
						<option value='highest'>Del precio mas alto al mas bajo</option>
						<option value='toprated'>
							Por Promedio de opiniones de clientes
						</option>
					</select>
				</div>
				<div className={styles.contenSearch}>
					<div>
						<Route
							render={({ history }) => (
								<SearchBox history={history}></SearchBox>
							)}
						></Route>
					</div>
				</div>
			</div>

			<div className={styles.container2}>
				<div className={styles.col1}>
					<h3>Buscar por categoria</h3>
					<div>
						{loadingCategories ? (
							<LoadingBox></LoadingBox>
						) : errorCategories ? (
							<MessageBox variant='danger'>{errorCategories}</MessageBox>
						) : (
							<ul>
								<li>
									<Link
										className={category === 'all' ? 'active' : ''}
										to={getFilterUrl({ category: 'all' })}
									>
										Todas
									</Link>
								</li>
								{categories.map(c => (
									<li key={c}>
										<Link
											className={c === category ? 'active' : ''}
											to={getFilterUrl({ category: c })}
										>
											{c}
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>
					{/* <div>
            <h3>Precio</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
					<div>
						<h3>Buscar por opinión</h3>
						<ul>
							{ratings.map(r => (
								<li key={r.name}>
									<Link
										to={getFilterUrl({ rating: r.rating })}
										className={`${r.rating}` === `${rating}` ? 'active' : ''}
									>
										<Rating caption={' & up'} rating={r.rating}></Rating>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div>
					{loading ? (
						<LoadingBox></LoadingBox>
					) : error ? (
						<MessageBox variant='danger'>{error}</MessageBox>
					) : (
						<>
							{services.length === 0 && (
								<MessageBox>No se Encontro Ningún Servicio</MessageBox>
							)}
							<div className={styles.cards}>
								{services.map(service => (
									<Service key={service._id} service={service}></Service>
								))}
							</div>
							<div className='row center pagination'>
								{[...Array(pages).keys()].map(x => (
									<Link
										className={x + 1 === page ? 'active' : ''}
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

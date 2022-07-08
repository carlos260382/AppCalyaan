// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { listServiceCategories } from '../actions/serviceActions.js';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export default function Asider() {
	const dispatch = useDispatch();
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
	const serviceCategoryList = useSelector(state => state.serviceCategoryList);
	const {
		loading: loadingCategories,
		error: errorCategories,
		categories,
	} = serviceCategoryList;
	useEffect(() => {
		dispatch(listServiceCategories());
	}, [dispatch]);

	return (
		<div>
			<section>
				<button
					type='button'
					className='open-sidebar'
					onClick={() => setSidebarIsOpen(true)}
				>
					<i className='fa fa-bars'></i>
				</button>
				<NavLink className='brand' to='/'></NavLink>
			</section>

			<aside className={sidebarIsOpen ? 'open' : ''}>
				<ul className='categories'>
					<li>
						<strong>Categorias</strong>
						<button
							onClick={() => setSidebarIsOpen(false)}
							className='close-sidebar'
							type='button'
						>
							<i className='fa fa-close'></i>
						</button>
					</li>
					{loadingCategories ? (
						<LoadingBox></LoadingBox>
					) : errorCategories ? (
						<MessageBox variant='danger'>{errorCategories}</MessageBox>
					) : (
						categories.map(c => (
							<li key={c}>
								<NavLink
									to={`/search/category/${c}`}
									onClick={() => setSidebarIsOpen(false)}
								>
									{c}
								</NavLink>
							</li>
						))
					)}
				</ul>
			</aside>
		</div>
	);
}

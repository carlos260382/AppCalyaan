// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import OrderScreenTurn from './screens/OrderScreenTurn';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ServiceListScreen from './screens/ServiceListScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ServiceScreen from './screens/ServiceScreen';
import ServiceEditScreen from './screens/ServiceEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchScreen from './screens/SearchScreen';
import { listServiceCategories } from './actions/serviceActions';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import Navbar from './components/Navbar';
import MercadoPagoForm from './MercadoPago/components/MercadoPagoForm';
import Landing from './screens/Landing';
import TurnScreen from './screens/TurnScreen';
import TurnListScreen from './screens/TurnListScreen';
import Footer from './components/Footer.js';
import recoverPasswordScreen from './screens/recoverPasswordScreen.js';
import ResetPasswordScreen from './screens/ResetPasswordScreen.js';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listServiceCategories());
	}, [dispatch]);
	return (
		<BrowserRouter>
			<Navbar />

			<main>
				<Route path='/' component={Landing} exact></Route>
				<Route path='/seller/:id' component={SellerScreen}></Route>
				<Route path='/cart/:id?' component={CartScreen}></Route>
				<Route path='/service/:id' component={ServiceScreen} exact></Route>

				<Route
					path='/service/:id/edit'
					component={ServiceEditScreen}
					exact
				></Route>
				<Route path='/signin' component={SigninScreen}></Route>
				<Route
					path='/recoverPassword'
					component={recoverPasswordScreen}
				></Route>
				<Route
					path='/resetPassword/:id/:number'
					component={ResetPasswordScreen}
				></Route>
				<Route path='/register/:id' component={RegisterScreen}></Route>
				{/* <Route path='/register' component={RegisterScreen}></Route> */}
				<Route path='/shipping' component={ShippingAddressScreen}></Route>
				<Route path='/payment' component={PaymentMethodScreen}></Route>
				<Route path='/placeorder' component={PlaceOrderScreen}></Route>
				<Route path='/order/:id' component={OrderScreen}></Route>
				<Route path='/orderTurn/:id' component={OrderScreenTurn}></Route>
				<Route path='/turnlist' component={TurnListScreen}></Route>
				<Route path='/orderhistory' component={OrderHistoryScreen}></Route>
				<Route path='/mercadoPago/:id' component={MercadoPagoForm}></Route>

				<Route
					path='/search/name/:name?'
					component={SearchScreen}
					exact
				></Route>
				<Route
					path='/search/category/:category'
					component={SearchScreen}
					exact
				></Route>
				<Route
					path='/search/category/:category/name/:name'
					component={SearchScreen}
					exact
				></Route>
				<Route
					path='/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber'
					component={SearchScreen}
					exact
				></Route>
				<PrivateRoute path='/profile' component={ProfileScreen}></PrivateRoute>
				<PrivateRoute path='/map' component={MapScreen}></PrivateRoute>
				<AdminRoute
					path='/servicelist'
					component={ServiceListScreen}
					exact
				></AdminRoute>
				<AdminRoute
					path='/servicelist/pageNumber/:pageNumber'
					component={ServiceListScreen}
					exact
				></AdminRoute>

				<AdminRoute
					path='/orderlist'
					component={OrderListScreen}
					exact
				></AdminRoute>
				<AdminRoute path='/userlist' component={UserListScreen}></AdminRoute>
				<AdminRoute
					path='/user/:id/edit'
					component={UserEditScreen}
				></AdminRoute>

				<AdminRoute path='/dashboard' component={DashboardScreen}></AdminRoute>
				<AdminRoute path='/support' component={SupportScreen}></AdminRoute>

				<SellerRoute
					path='/servicelist/seller'
					component={ServiceListScreen}
				></SellerRoute>

				<SellerRoute
					path='/orderlist/seller'
					component={OrderListScreen}
				></SellerRoute>

				<Route path='/service' component={SearchScreen} exact></Route>
				<Route path='/turn' component={TurnScreen} exact></Route>
			</main>
			<Footer />
			{/* <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>Todos los derechos reservados</div>{' '}
        </footer> */}
		</BrowserRouter>
	);
}

export default App;

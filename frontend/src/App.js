import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
//import HomeScreenService from './screens/HomeScreenService';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import OrderScreenTurn from './screens/OrderScreenTurn';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ServiceListScreen from './screens/ServiceListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ServiceScreen from './screens/ServiceScreen';
import ServiceEditScreen from './screens/ServiceEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';
import Navbar from './components/Navbar';
import MercadoPagoForm from './MercadoPago/components/MercadoPagoForm';
import Landing from './screens/Landing';
import TurnScreen from './screens/TurnScreen';
import TurnListScreen from './screens/TurnListScreen';
import worker from './webPush/worker';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
    <Navbar/>
      
        
        <main>
          <Route path="/" component={Landing} exact></Route>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/service/:id" component={ServiceScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/service/:id/edit" component={ServiceEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderTurn/:id" component={OrderScreenTurn}></Route>
          <Route path="/turnlist" component={TurnListScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/mercadoPago/:id" component={MercadoPagoForm}></Route>
          <Route path="/worker" component={worker}></Route>      
          
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/servicelist"
            component={ServiceListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/servicelist/pageNumber/:pageNumber"
            component={ServiceListScreen}
            exact
          ></AdminRoute>

          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>

          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/servicelist/seller"
            component={ServiceListScreen}
          ></SellerRoute>

          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>

          <Route path="/product" component={HomeScreen} exact></Route>
          <Route path="/service" component={SearchScreen} exact></Route>
          <Route path="/turn" component={TurnScreen} exact></Route>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>Todos los derechos reservados</div>{' '}
        </footer>
    </BrowserRouter>
  );
}

export default App;
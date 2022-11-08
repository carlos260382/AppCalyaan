import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderUpdateReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
  orderSummaryReducer,
} from "./reducers/orderReducers";

import {
  serviceCategoryListReducer,
  serviceCreateReducer,
  serviceDeleteReducer,
  serviceDetailsReducer,
  serviceListReducer,
  serviceReviewCreateReducer,
  serviceUpdateReducer,
} from "./reducers/serviceReducers";

import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopSellerListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
  userListProfessionalReducer,
} from "./reducers/userReducers";

import {
  turnCreateReducer,
  turnListReducer,
  turnUpdateReducer,
  turnDeleteReducer,
  turnGetReducer,
} from "./reducers/turnReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Mercado Pago",
  },
};
const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceDetails: serviceDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  serviceCreate: serviceCreateReducer,
  serviceUpdate: serviceUpdateReducer,
  serviceDelete: serviceDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  orderUpdate: orderUpdateReducer,
  userList: userListReducer,
  userListProfessional: userListProfessionalReducer,
  userDelete: userDeleteReducer,
  userTopSellersList: userTopSellerListReducer,
  serviceCategoryList: serviceCategoryListReducer,
  serviceReviewCreate: serviceReviewCreateReducer,
  userAddressMap: userAddressMapReducer,
  orderSummary: orderSummaryReducer,
  turnCreate: turnCreateReducer,
  turnList: turnListReducer,
  turnUpdate: turnUpdateReducer,
  turnDelete: turnDeleteReducer,
  turnGet: turnGetReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

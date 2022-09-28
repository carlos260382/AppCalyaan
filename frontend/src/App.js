/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, HashRouter } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderScreenTurn from "./screens/OrderScreenTurn";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ServiceListScreen from "./screens/ServiceListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import ServiceScreen from "./screens/ServiceScreen";
import ServiceEditScreen from "./screens/ServiceEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";
import SearchScreen from "./screens/SearchScreen";
import MapScreen from "./screens/MapScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SupportScreen from "./screens/SupportScreen";
import Navbar from "./components/Navbar";
import MercadoPagoForm from "./MercadoPago/components/MercadoPagoForm";
import Landing from "./screens/Landing";
import TurnScreen from "./screens/TurnScreen";
import TurnListScreen from "./screens/TurnListScreen";
import Footer from "./components/Footer.js";
import recoverPasswordScreen from "./screens/recoverPasswordScreen.js";
import ResetPasswordScreen from "./screens/ResetPasswordScreen.js";
import CartScreenOnly from "./screens/CartScreenOnly.js";
import Updater from "./components/Updater.js";
import { onServiceWorkerUpdate } from "@3m1/service-worker-updater";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.js";

function App(config) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (userInfo) {
      serviceWorkerRegistration.register({
        onUpdate: onServiceWorkerUpdate,
        userInfo,
      });
    }
  }, []);

  // const dispatch = useDispatch();

  // const isLocalhost = Boolean(
  //   window.location.hostname === "localhost" ||
  //     // [::1] is the IPv6 localhost address.
  //     window.location.hostname === "[::1]" ||
  //     // 127.0.0.0/8 are considered localhost for IPv4.
  //     window.location.hostname.match(
  //       /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  //     )
  // );

  // const vapidKeys = {
  //   publicKey:
  //     "BEvzM53UuYf7sR55AmLYtzpx6XgX6Y3AhzywNfAU-OfXZKh5otnrIQSjmUSjOG2dXf6U6iv6V5VDL6_X55Hx-10",
  // };

  // function register() {
  //   if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  //     // The URL constructor is available in all browsers that support SW.
  //     const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
  //     if (publicUrl.origin !== window.location.origin) {
  //       // Our service worker won't work if PUBLIC_URL is on a different origin
  //       // from what our page is served on. This might happen if a CDN is used to
  //       // serve assets; see https://github.com/facebook/create-react-app/issues/2374
  //       return;
  //     }

  //     window.addEventListener("load", () => {
  //       const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

  //       if (isLocalhost) {
  //         // This is running on localhost. Let's check if a service worker still exists or not.
  //         checkValidServiceWorker(swUrl, config);

  //         // Add some additional logging to localhost, pointing developers to the
  //         // service worker/PWA documentation.
  //         navigator.serviceWorker.ready.then(() => {
  //           console.log(
  //             "This web app is being served cache-first by a service " +
  //               "worker. To learn more, visit https://cra.link/PWA"
  //           );
  //         });
  //       } else {
  //         // Is not localhost. Just register service worker
  //         registerValidSW(swUrl, config);
  //       }
  //     });
  //   }
  // }

  // function urlBase64ToUint8Array(base64String) {
  //   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  //   const base64 = (base64String + padding)
  //     .replace(/-/g, "+")
  //     .replace(/_/g, "/");

  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);

  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   return outputArray;
  // }

  // function registerValidSW(swUrl, config) {
  //   console.log("esta es la config", config);

  //   navigator.serviceWorker
  //     .register(swUrl)
  //     .then((registration) => {
  //       registration.pushManager.getSubscription().then(async (sub) => {
  //         const subscriptions = await registration.pushManager.subscribe({
  //           userVisibleOnly: true,
  //           applicationServerKey: urlBase64ToUint8Array(vapidKeys.publicKey),
  //         });
  //         // se lo enviamos al backend

  //         console.log("subscrition enviada", subscriptions);
  //         dispatch(subscriptionUser(userInfo, subscriptions));

  //         // const data = await Axios.post(
  //         //   `${process.env.REACT_APP_API_BASE_URL}/api/users/suscribed`,
  //         //   {
  //         //     subscription: JSON.stringify(subscriptions),
  //         //     userInfo: config.userInfo,
  //         //   }
  //         // );

  //         //  console.log("data del backend.data", data.data);
  //         //   localStorage.setItem("userInfo", JSON.stringify(data.data));
  //       });
  //       registration.onupdatefound = () => {
  //         const installingWorker = registration.installing;
  //         if (installingWorker == null) {
  //           return;
  //         }
  //         installingWorker.onstatechange = () => {
  //           if (installingWorker.state === "installed") {
  //             if (navigator.serviceWorker.controller) {
  //               // At this point, the updated precached content has been fetched,
  //               // but the previous service worker will still serve the older
  //               // content until all client tabs are closed.
  //               console.log(
  //                 "New content is available and will be used when all " +
  //                   "tabs for this page are closed. See https://cra.link/PWA."
  //               );

  //               // Execute callback
  //               if (config && config.onUpdate) {
  //                 config.onUpdate(registration);
  //               }
  //             } else {
  //               // At this point, everything has been precached.
  //               // It's the perfect time to display a
  //               // "Content is cached for offline use." message.
  //               console.log("Content is cached for offline use.");

  //               // Execute callback
  //               if (config && config.onSuccess) {
  //                 config.onSuccess(registration);
  //               }
  //             }
  //           }
  //         };
  //       };
  //     })
  //     .catch((error) => {
  //       console.error("Error during service worker registration:", error);
  //     });
  // }

  // function checkValidServiceWorker(swUrl, config) {
  //   // Check if the service worker can be found. If it can't reload the page.
  //   fetch(swUrl, {
  //     headers: { "Service-Worker": "script" },
  //   })
  //     .then((response) => {
  //       // Ensure service worker exists, and that we really are getting a JS file.
  //       const contentType = response.headers.get("content-type");
  //       if (
  //         response.status === 404 ||
  //         (contentType != null && contentType.indexOf("javascript") === -1)
  //       ) {
  //         // No service worker found. Probably a different app. Reload the page.
  //         navigator.serviceWorker.ready.then((registration) => {
  //           registration.unregister().then(() => {
  //             window.location.reload();
  //           });
  //         });
  //       } else {
  //         // Service worker found. Proceed as normal.
  //         registerValidSW(swUrl, config);
  //       }
  //     })
  //     .catch(() => {
  //       console.log(
  //         "No internet connection found. App is running in offline mode."
  //       );
  //     });

  // function unregister() {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker.ready
  //       .then((registration) => {
  //         registration.unregister();
  //       })
  //       .catch((error) => {
  //         console.error(error.message);
  //       });
  //   }
  // }

  //   register({ onUpdate: onServiceWorkerUpdate });
  // }

  return (
    <>
      <HashRouter>
        <Updater />
        <Navbar />

        <main>
          <Route path="/" component={Landing} exact></Route>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/cartOnly/:id?" component={CartScreenOnly}></Route>
          <Route path="/register/:id" component={RegisterScreen}></Route>
          <Route path="/service/:id" component={ServiceScreen} exact></Route>

          <Route
            path="/service/:id/edit"
            component={ServiceEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route
            path="/recoverPassword"
            component={recoverPasswordScreen}
          ></Route>
          <Route
            path="/resetPassword/:id/:number"
            component={ResetPasswordScreen}
          ></Route>

          {/* <Route path='/register' component={RegisterScreen}></Route> */}
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderTurn/:id" component={OrderScreenTurn}></Route>
          <Route path="/turnlist" component={TurnListScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/mercadoPago/:id" component={MercadoPagoForm}></Route>

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
            path="/servicelist/seller"
            component={ServiceListScreen}
          ></SellerRoute>

          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>

          <Route path="/service" component={SearchScreen} exact></Route>
          <Route path="/turn" component={TurnScreen} exact></Route>
        </main>
        <Footer />
        {/* <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>Todos los derechos reservados</div>{' '}
        </footer> */}
      </HashRouter>
    </>
  );
}

export default App;

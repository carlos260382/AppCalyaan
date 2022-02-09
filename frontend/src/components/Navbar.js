/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import SearchBox from './SearchBox';
import { NavLink, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/userActions';
import { listProductCategories } from '../actions/productActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import styles from "./Navbar.module.css";
import logo from '../assent/logo.png'

function Navbar() {
    const cart = useSelector((state) => state.cart);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
      dispatch(signout());
    };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

return (
    <div>
    <div className={styles.container}>
    <NavLink to="/Home">
        <h3> Inicio </h3>
      </NavLink>
      <NavLink to="/Tienda">
      <h3>Tienda</h3>
      </NavLink>
      <NavLink to="/Servicios">
      <h3>Servicios Corporativos</h3>
      </NavLink>
      <NavLink to="/Blog">
      <h3> Blog</h3>
      </NavLink>
      <NavLink to="/Nosotros">
      <h3> Nosotros</h3>
      </NavLink>
      <NavLink to="/Contacto">
      <h3> Contacto</h3>
      </NavLink>
    </div>


    {/* <div>
      <button
        type="button"
        className="open-sidebar"
        onClick={() => setSidebarIsOpen(true)}
      >
        <i className="fa fa-bars"></i>
      </button>
      <Link className="brand" to="/">
        
      </Link>
    </div> */}
<div className={styles.container2}>    
<div>
<img src={logo} className={styles.logo}/>
</div>

    <div className={styles.search}>
      <Route
        render={({ history }) => (
          <SearchBox history={history}></SearchBox>
        )}
      ></Route>
    </div>

    <div className={styles.cart}>
      <NavLink to="/cart">
        Cart
        {cartItems.length > 0 && (
          <span className="badge">{cartItems.length}</span>
        )}
      </NavLink>
</div>

<div className={styles.signin}> 
      {userInfo ? (
        <div className="dropdown">
          <NavLink to="#">
            {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
          </NavLink>
          <ul className="dropdown-content">
            <li>
              <NavLink to="/profile">User Profile</NavLink>
            </li>
            <li>
              <NavLink to="/orderhistory">Order History</NavLink>
            </li>
            <li>
              <NavLink to="#signout" onClick={signoutHandler}>
                Sign Out
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <NavLink to="/signin">Sign In</NavLink>
      )}
      {userInfo && userInfo.isSeller && (
        <div className="dropdown">
          <NavLink to="#admin">
            Seller <i className="fa fa-caret-down"></i>
          </NavLink>
          <ul className="dropdown-content">
            <li>
              <NavLink to="/productlist/seller">Products</NavLink>
            </li>
            <li>
              <NavLink to="/orderlist/seller">Orders</NavLink>
            </li>
          </ul>
        </div>
      )}
      {userInfo && userInfo.isAdmin && (
        <div className="dropdown">
          <NavLink to="#admin">
            Admin <i className="fa fa-caret-down"></i>
          </NavLink>
          <ul className="dropdown-content">
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/productlist">Products</NavLink>
            </li>
            <li>
              <NavLink to="/orderlist">Orders</NavLink>
            </li>
            <li>
              <NavLink to="/userlist">Users</NavLink>
            </li>
            <li>
              <NavLink to="/support">Support</NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
    <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
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

  </div>


)

}

export default Navbar;
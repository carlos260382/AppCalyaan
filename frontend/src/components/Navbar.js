/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import SearchBox from './SearchBox';
import { NavLink, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../actions/userActions';
import { listServiceCategories } from '../actions/serviceActions.js';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import styles from "../style/Navbar.module.css";
import logo from '../assent/logo.png'
import carrito from '../assent/cart2.svg'


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

const handleClickInicio = ()=>{
      window.location.replace('https://calyaan.com/')
  }

const handleClickService = ()=>{
    window.location.replace('https://calyaan.com/empresarial/')
}

const handleClickBlog = ()=>{
  window.location.replace('https://calyaan.com/blog/')
}

const handleClickNosotros = ()=>{
  window.location.replace('https://calyaan.com/quienes-somos/')
}

const handleClickContacto = ()=>{
  window.location.replace('https://calyaan.com/contactanos/')
}

  const serviceCategoryList = useSelector((state) => state.serviceCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = serviceCategoryList;
  useEffect(() => {
    dispatch(listServiceCategories());
  }, [dispatch]);

return (
    <div className={styles.all}>
    <div className={styles.container}>
    <div className={styles.menu}>
    <NavLink  to= "/" onClick = {handleClickInicio}>
        <h3> Inicio </h3>
      </NavLink>
      <NavLink to= "/" onClick={handleClickService}>
      <h3>Servicios Corporativos</h3>
      </NavLink>
      <NavLink to= "/" onClick={handleClickBlog}>
      <h3> Blog</h3>
      </NavLink>
      <NavLink to= "/" onClick={handleClickNosotros}>
      <h3> Nosotros</h3>
      </NavLink>
      <NavLink to= "/" onClick={handleClickContacto}>
      <h3> Contacto</h3>
      </NavLink>
    </div>
    </div>


<div className={styles.container2}>
<div className={styles.navbar}>    
<div>
<NavLink to="/">
<img src={logo} alt="Logo" />
</NavLink>
</div>

    <div>
      <Route
        render={({ history }) => (
          <SearchBox history={history}></SearchBox>
        )}
      ></Route>
    </div>

    <div className={styles.carrito}>
      <NavLink to="/cart">
      <img src={carrito} alt="description"/>
        {cartItems.length > 0 && (
          <span className={styles.badge}>{cartItems.length}</span>
        )}
      </NavLink>
</div>

<div className={styles.signin}>
{userInfo ? (
        <div className="dropdown">
          <NavLink to="#" className={styles.nav}>
            {userInfo.name} <i></i>{' '}
          </NavLink>
          <ul className="dropdown-content">
            <li>
              <NavLink to="/profile">Perfil de Usuario</NavLink>
            </li>
            <li>
              <NavLink to="/orderhistory">Historial de pedidos</NavLink>
            </li>
            <li>
              <NavLink to="#signout" onClick={signoutHandler}>
              Desconectar
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <NavLink to="/signin"> <bottom className={styles.btn}>Iniciar sesión</bottom></NavLink>
      )}
      {userInfo && userInfo.isSeller && (
        <div className="dropdown">
          <NavLink to="#admin" className={styles.nav}>
            Vendedor <i></i>
          </NavLink>
          <ul className="dropdown-content">
            <li>
              <NavLink to="/servicelist/seller">Servicios</NavLink>
            </li>
            <li>
              <NavLink to="/turnlist">Turnos</NavLink>
            </li>
            <li>
              <NavLink to="/orderlist/seller">Pedidos</NavLink>
            </li>
          </ul>
        </div>
      )}
      {userInfo && userInfo.isAdmin && (
        <div className="dropdown">
          <NavLink to="#admin" className={styles.nav}>
            Admin <i></i>
          </NavLink>
          <ul className="dropdown-content">
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/servicelist">Servicios</NavLink>
            </li>
            <li>
              <NavLink to="/turnlist">Turnos</NavLink>
            </li>
           <li>
              <NavLink to="/orderlist">Pedidos</NavLink>
            </li>
            <li>
              <NavLink to="/userlist">Usuarios</NavLink>
            </li>
            <li>
              <NavLink to="/support">Soporte</NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
    </div>
    <div className= {styles.container3}>
         
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <NavLink className="brand" to="/">
              
            </NavLink>
          </div>


    <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categorias</strong>
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
  </div>


)

}

export default Navbar;
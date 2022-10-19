/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { signout } from "../actions/userActions";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import styles from "../style/ProfileBtn.module.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import avatar from "../assent/avatar.png";

const ProfileBtn = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      size="sm"
      className={styles.Dropdown}
    >
      <DropdownToggle caret>
        {" "}
        <img src={avatar} />
      </DropdownToggle>
      {dropdownOpen && !userInfo.isSeller && !userInfo.isAdmin ? (
        <DropdownMenu className={styles.MenuDropdown}>
          <DropdownItem header className={styles.MenuHeader}>
            {userInfo.phone}
          </DropdownItem>
          <NavLink to="/profile">
            <DropdownItem className={styles.MenuItem}>
              Perfil de Usuario
            </DropdownItem>
          </NavLink>
          <NavLink to="/orderhistory">
            <DropdownItem className={styles.MenuItem}>
              Historial de pedidos
            </DropdownItem>
          </NavLink>
          <NavLink to="/signout" onClick={signoutHandler}>
            <DropdownItem className={styles.MenuItem}>Salir</DropdownItem>
          </NavLink>
          <DropdownItem divider />{" "}
        </DropdownMenu>
      ) : dropdownOpen && userInfo.isSeller && !userInfo.isAdmin ? (
        <DropdownMenu className={styles.MenuDropdown}>
          <DropdownItem header className={styles.MenuHeader}>
            Profesional <br />
            {userInfo.phone}
          </DropdownItem>
          <NavLink to="/profile">
            <DropdownItem className={styles.MenuItem}>
              Perfil de Usuario
            </DropdownItem>
          </NavLink>
          {/* <NavLink to="/orderhistory">
            <DropdownItem className={styles.MenuItem}>
              Historial de pedidos
            </DropdownItem>
          </NavLink> */}
          {/* <NavLink to="/servicelist/seller">
            <DropdownItem className={styles.MenuItem}>Servicios</DropdownItem>
          </NavLink> */}
          <NavLink to="/turnlist">
            <DropdownItem className={styles.MenuItem}>
              Turnos Pendientes
            </DropdownItem>
          </NavLink>
          <NavLink to="/orderlist/seller">
            <DropdownItem className={styles.MenuItem}>
              Pedidos Tomados
            </DropdownItem>
          </NavLink>
          <NavLink to="/signout" onClick={signoutHandler}>
            <DropdownItem className={styles.MenuItem}>Salir</DropdownItem>
          </NavLink>
        </DropdownMenu>
      ) : dropdownOpen && userInfo.isAdmin ? (
        <DropdownMenu className={styles.MenuDropdown}>
          <DropdownItem header className={styles.MenuHeader}>
            Administrador <br />
            {userInfo.phone}
          </DropdownItem>
          <NavLink to="/profile">
            <DropdownItem className={styles.MenuItem}>
              Perfil de Usuario
            </DropdownItem>
          </NavLink>
          <NavLink to="/dashboard">
            <DropdownItem className={styles.MenuItem}>Dashboard</DropdownItem>
          </NavLink>
          <NavLink to="/servicelist">
            <DropdownItem className={styles.MenuItem}>Servicios</DropdownItem>
          </NavLink>
          <NavLink to="/turnlist">
            <DropdownItem className={styles.MenuItem}>Turnos</DropdownItem>
          </NavLink>
          <NavLink to="/orderlist">
            <DropdownItem className={styles.MenuItem}>Pedidos</DropdownItem>
          </NavLink>
          <NavLink to="/userlist">
            <DropdownItem className={styles.MenuItem}>Usuarios</DropdownItem>
          </NavLink>
          <NavLink to="/support">
            <DropdownItem className={styles.MenuItem}>Soporte</DropdownItem>
          </NavLink>
          <NavLink to="/signout" onClick={signoutHandler}>
            <DropdownItem className={styles.MenuItem}>Salir</DropdownItem>
          </NavLink>
        </DropdownMenu>
      ) : (
        ""
      )}
    </Dropdown>
  );
};

export default ProfileBtn;

// import React, { useState, useEffect, useRef } from "react";
// import styles from "../style/ProfileBtn.module.css";

// function Dropdown({ items = [], dropdownTitle }) {
//   const activatorRef = useRef(null);
//   const dropdownListRef = useRef(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const clickHandler = () => {
//     setIsOpen(!isOpen);
//   };

//   const keyHandler = (event) => {
//     // console.log(event);
//     if (event.key === "Escape" && isOpen) {
//       setIsOpen(false);
//     }
//   };

//   const clickOutsideHandler = (event) => {
//     if (dropdownListRef.current) {
//       if (
//         dropdownListRef.current.contains(event.target) ||
//         activatorRef.current.contains(event.target)
//       ) {
//         return;
//       }

//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       dropdownListRef.current.querySelector("a").focus();
//       document.addEventListener("mousedown", clickOutsideHandler);
//     } else {
//       document.addEventListener("mousedown", clickOutsideHandler);
//     }
//   }, [isOpen]);

//   return (
//     <div className={styles.dropdown_wrapper} onKeyUp={keyHandler}>
//       <button
//         className={styles.dropdown_activator}
//         aria-haspopup="true"
//         aria-controls={dropdownTitle}
//         onClick={clickHandler}
//         ref={activatorRef}
//       >
//         {dropdownTitle}{" "}
//         {isOpen ? (
//           <svg
//             height="24"
//             fill="rgb(70,70,70)"
//             viewBox="0 0 24 24"
//             width="24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="m0 0h24v24h-24z" fill="none" />
//             <path d="m7.41 15.41 4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z" />
//           </svg>
//         ) : (
//           <svg
//             height="24"
//             fill="rgb(70,70,70)"
//             viewBox="0 0 24 24"
//             width="24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="m0 0h24v24h-24z" fill="none" />
//             <path d="m7.41 8.59 4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
//           </svg>
//         )}
//       </button>
//       <ul
//         ref={dropdownListRef}
//         // className={`${dropdown_item_list} ${isOpen ? active : ""} `}
//       >
//         {items.map((item, index) => {
//           return (
//             <li className={styles.item_list} key={index}>
//               <a href={item.slug}>{item.anchor}</a>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default Dropdown;

// export default function ProfileBtn() {
//   const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo } = userSignin;
//   const dispatch = useDispatch();
//   const signoutHandler = () => {
//     dispatch(signout());
//   };

//   useEffect(() => {}, []);
//   console.log("el sider", sidebarIsOpen);
//   return (
//     <div>
//       <section>
//         <button type="button" onClick={() => setSidebarIsOpen(true)}>
//           <img src={avatar} alt="avatar"></img>
//         </button>
//       </section>

//       <aside>
//         {sidebarIsOpen ? (
//           <div>
//             <NavLink to="#">
//               {userInfo.phone} <i></i>{" "}
//             </NavLink>
//             <ul>
//               <li>
//                 <NavLink to="/profile">Perfil de Usuario</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/orderhistory">Historial de pedidos</NavLink>
//               </li>
//               <li>
//                 <NavLink to="#signout" onClick={signoutHandler}>
//                   Desconectar
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         ) : (
//           ""
//         )}
//       </aside>
//     </div>
//   );
// }

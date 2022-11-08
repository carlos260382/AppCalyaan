// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listServiceCategories } from "../actions/serviceActions.js";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Swal from "sweetalert2";
import styles from "../style/ProfileScreen.module.css";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [category, setCategory] = useState([]);
  const [sellerDescription, setSellerDescription] = useState("");
  const [urlReferred, seturlReferred] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const serviceCategoryList = useSelector((state) => state.serviceCategoryList);
  const { categories } = serviceCategoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);

      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
        dispatch(listServiceCategories());
      }
    }

    if (userInfo)
      seturlReferred(`${process.env.PUBLIC_URL}/#/register/${userInfo._id} `);
  }, [dispatch, userInfo._id, user, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      Swal.fire("Las contraseñas no coinciden");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          category,
          sellerDescription,
          gender,
          dateOfBirth,
        })
      );
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(urlReferred);
    Swal.fire("Link copiado al portapapeles");
  };

  const handleChange = (evento) => {
    setCategory((category) => [...category, evento]);
  };

  console.log("categorias de profesional", category);
  return (
    <div className={styles.container}>
      <div className={styles.referred}>
        <h2>Puntos Acumulados {userInfo.pointsUser} </h2>
        <div>
          <h2>Link de Referido</h2>
          <p>
            Comparte este link de registro y recibe el 5% del valor de las
            compras
          </p>

          <span className={styles.url}>
            {`${process.env.PUBLIC_URL}....${userInfo._id} `}{" "}
            <input
              type="submit"
              value="Copiar Link"
              onClick={copyText}
              className={styles.btn}
            />
          </span>
        </div>
      </div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Perfil de Usuario</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Perfil Actualizado con Éxito
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
              <input
                type="date"
                name="dateOfBirth"
                placeholder="fecha"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              ></input>
            </div>
            <div className={styles.mail}>
              <label htmlFor="gender">Genero</label>
              <select name="gender" onChange={(e) => setGender(e.target.value)}>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Sin especificar">Sin especificar</option>
              </select>
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            {user.isSeller && (
              <>
                <h1>Profesional</h1>
                <div>
                  <label htmlFor="sellerName">Nombre del Profesional</label>
                  <input
                    id="sellerName"
                    type="text"
                    placeholder="Nombre"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="Url Foto">Foto</label>
                  <input
                    id="sellerLogo"
                    type="text"
                    placeholder="Logo"
                    value={sellerLogo}
                    onChange={(e) => setSellerLogo(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="category">
                    Seleccione las categorias de los servicios que presta
                  </label>

                  {categories?.map((item, index) => (
                    <div key={index}>
                      <input
                        value={item}
                        type="checkbox"
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="sellerDescription">
                    Descripción del Profesional
                  </label>
                  <input
                    id="sellerDescription"
                    type="text"
                    placeholder="Ingresar descripcion del Profesional"
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                  ></input>
                </div>
              </>
            )}
            <div>
              <label />
              <button type="submit">Actualizar</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

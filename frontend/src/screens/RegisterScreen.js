/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
//import Swal from "sweetalert2";
import styles from "../style/SigninScreen.module.css";
import { useForm } from "../components/UseForm.js";
import Message from "./Message";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexPassword = /^.{8,20}$/;
  let regexPhoneCount = /^.{10}$/;
  // /^.{10}+[0-9]$/;
  let regexOnlyNumber = /^\d+$/;

  if (!form.phone?.trim()) {
    errors.phone = "El campo 'Teléfono' es requerido";
  } else if (!regexPhoneCount.test(form.phone?.trim())) {
    errors.phone = "Debe contener 10 digitos";
  } else if (!regexOnlyNumber.test(form.phone?.trim())) {
    errors.phone = "Debe ingresar solo numeros";
  }

  // else if (!regexName.test(form.name.trim())) {
  //   errors.name = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
  // }

  if (!form.name?.trim()) {
    errors.name = "El campo 'Nombre' es requerido";
  } else if (!regexName.test(form.name?.trim())) {
    errors.name = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
  }

  if (!form.email?.trim()) {
    errors.email = "El campo 'Email' es requerido";
  } else if (!regexEmail.test(form.email?.trim())) {
    errors.email = "El campo 'Email' es incorrecto";
  }

  if (form.password !== form.confirmPassword) {
    errors.password = "Las contraseñas no coinciden";
  } else if (!regexPassword.test(form.password?.trim())) {
    errors.password = "Debe contener minimo 8 caracteres";
  }

  return errors;
};

let styless = {
  color: "#dc3545",
};

export default function RegisterScreen(props) {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm);

  // console.log("ID de userFather", props);
  const { id } = props.match.params;

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  //const [confirmPassword, setConfirmPassword] = useState("");
  // const [phone, setPhone] = useState("");
  // const [userfatherId, setUserfatherId] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, error } = userRegister;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  // const dispatch = useDispatch();

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     Swal.fire("Las contraseñas no coinciden");
  //   } else {
  //     dispatch(register(name, email, password, phone, userfatherId));
  //   }
  // };
  useEffect(() => {
    if (id) {
      initialForm.userfatherId = id;
    }
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo, id]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Vas a crear una cuenta</h1>
          {/* <h2>ID de quien lo refiere {id}</h2> */}
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div className={styles.mail}>
          <label htmlFor="phone">Numero de telefono</label>
          <input
            type="tel"
            name="phone"
            placeholder="celular sin indicativo"
            onBlur={handleBlur}
            value={form.phone}
            onChange={handleChange}
            required
          ></input>
          {errors.phone && <p style={styless}>{errors.phone}</p>}
        </div>
        <div className={styles.mail}>
          <label htmlFor="phone">Nombre</label>
          <input
            type="text"
            name="name"
            placeholder="nombre"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.name}
            required
          />
          {errors.name && <p style={styless}>{errors.name}</p>}
        </div>
        <div className={styles.mail}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.email}
            required
          />
          {errors.email && <p style={styless}>{errors.email}</p>}
        </div>
        {/* <div className={styles.mail}>
          <label htmlFor="gender">Genero</label>
          <select name="gender" onChange={handleChange}>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="Sin especificar">Sin especificar</option>
          </select>
          {errors.gender && <p style={styless}>{errors.gender}</p>}
        </div> */}
        {/* <div className={styles.mail}>
          <label htmlFor="dateOfBirth">Fecha </label>

          <input
            type="date"
            name="dateOfBirth"
            placeholder="fecha"
            onBlur={handleBlur}
            value={form.dateOfBirth}
            onChange={handleChange}
            required
          ></input>
          {errors.dateOfBirth && <p style={styless}>{errors.dateOfBirth}</p>}
        </div> */}
        <div className={styles.mail}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="contraseña"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.password}
          ></input>
          {errors.password && <p style={styless}>{errors.password}</p>}
        </div>
        <div className={styles.mail}>
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="repita su contraseña"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.confirmPassword}
            required
          ></input>
          {errors.password && <p style={styless}>{errors.password}</p>}
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Registrarse
          </button>
        </div>
        <div>
          <label />
          <div className={styles.signin}>
            ¿Ya tienes una cuenta?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Inicia sesión</Link>
          </div>
        </div>
      </form>
      {loading && <LoadingBox />}
      {response && (
        <Message msg="Los datos han sido enviados" bgColor="#198754" />
      )}
    </div>

    //   <div className={styles.container}>
    //     <form className="form" onSubmit={submitHandler}>
    //       <div>
    //         <h1>Crear una cuenta</h1>
    //         <h2>ID de quien lo refiere {id}</h2>
    //       </div>
    //       {loading && <LoadingBox></LoadingBox>}
    //       {error && <MessageBox variant="danger">{error}</MessageBox>}
    //       <div className={styles.mail}>
    //         <label htmlFor="phone">Numero de telefono</label>
    //         <input
    //           type="text"
    //           id="phone"
    //           placeholder="telefono"
    //           required
    //           onChange={(e) => setPhone(e.target.value)}
    //         ></input>
    //       </div>
    //       <div className={styles.mail}>
    //         <label htmlFor="name">Nombre</label>
    //         <input
    //           type="text"
    //           id="name"
    //           placeholder="Enter name"
    //           required
    //           onChange={(e) => setName(e.target.value)}
    //         ></input>
    //       </div>
    //       <div className={styles.mail}>
    //         <label htmlFor="email">Correo Electrónico</label>
    //         <input
    //           type="email"
    //           id="email"
    //           placeholder="Enter email"
    //           required
    //           onChange={(e) => setEmail(e.target.value)}
    //         ></input>
    //       </div>

    //       <div className={styles.mail}>
    //         <label htmlFor="password">Contraseña</label>
    //         <input
    //           type="password"
    //           id="password"
    //           placeholder="Enter password"
    //           required
    //           onChange={(e) => setPassword(e.target.value)}
    //         ></input>
    //       </div>
    //       <div className={styles.mail}>
    //         <label htmlFor="confirmPassword">Confirmar Contraseña</label>
    //         <input
    //           type="password"
    //           id="confirmPassword"
    //           placeholder="Enter confirm password"
    //           required
    //           onChange={(e) => setConfirmPassword(e.target.value)}
    //         ></input>
    //       </div>
    //       <div>
    //         <label />
    //         <button className="primary" type="submit">
    //           Registrarse
    //         </button>
    //       </div>
    //       <div>
    //         <label />
    //         <div>
    //           ¿Ya tienes una cuenta?{" "}
    //           <Link to={`/signin?redirect=${redirect}`}>Inicia sesión</Link>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
  );
}

// const initialForm = {
//   name: "",
//   email: "",
//   subject: "",
//   comments: "",
// };

// const validationsForm = (form) => {
//   let errors = {};
//   let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
//   let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
//   let regexComments = /^.{1,255}$/;

//   if (!form.name.trim()) {
//     errors.name = "El campo 'Nombre' es requerido";
//   } else if (!regexName.test(form.name.trim())) {
//     errors.name = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
//   }

//   if (!form.email.trim()) {
//     errors.email = "El campo 'Email' es requerido";
//   } else if (!regexEmail.test(form.email.trim())) {
//     errors.email = "El campo 'Email' es incorrecto";
//   }

//   if (!form.subject.trim()) {
//     errors.subject = "El campo 'Asunto a tratar' es requerido";
//   }

//   if (!form.comments.trim()) {
//     errors.comments = "El campo 'Comentarios' es requerido";
//   } else if (!regexComments.test(form.comments.trim())) {
//     errors.comments =
//       "El campo 'Comentarios' no debe exceder los 255 caracteres";
//   }

//   return errors;
// };

// let styles = {
//   fontWeight: "bold",
//   color: "#dc3545",
// };

// const ContactForm = () => {
//   const {
//     form,
//     errors,
//     loading,
//     response,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//   } = useForm(initialForm, validationsForm);

//   return (
//     <div>
//       <h2>Formulario de Contacto</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Escribe tu nombre"
//           onBlur={handleBlur}
//           onChange={handleChange}
//           value={form.name}
//           required
//         />
//         {errors.name && <p style={styles}>{errors.name}</p>}
//         <input
//           type="email"
//           name="email"
//           placeholder="Escribe tu email"
//           onBlur={handleBlur}
//           onChange={handleChange}
//           value={form.email}
//           required
//         />
//         {errors.email && <p style={styles}>{errors.email}</p>}
//         <input
//           type="text"
//           name="subject"
//           placeholder="Asunto a tratar"
//           onBlur={handleBlur}
//           onChange={handleChange}
//           value={form.subject}
//           required
//         />
//         {errors.subject && <p style={styles}>{errors.subject}</p>}
//         <textarea
//           name="comments"
//           cols="50"
//           rows="5"
//           placeholder="Escribe tus comentarios"
//           onBlur={handleBlur}
//           onChange={handleChange}
//           value={form.comments}
//           required
//         ></textarea>
//         {errors.comments && <p style={styles}>{errors.comments}</p>}
//         <input type="submit" value="Enviar" />
//       </form>
//       {loading && <Loader />}
//       {response && (
//         <Message msg="Los datos han sido enviados" bgColor="#198754" />
//       )}
//     </div>
//   );
// };

// export default ContactForm;

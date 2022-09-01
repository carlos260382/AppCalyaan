import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ChatBox from "../components/ChatBox.js";
import styles from "../style/Footer.module.css";
import pinteres from "../assent/pinteres.png";
import youtube from "../assent/youtube.png";
import facebook from "../assent/facebook.png";
import instagram from "../assent/instagram.png";
import logo from "../assent/logo2.png";

export default function Footer() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // const goWhatsApp = () => {
  // 	window.location.replace(
  // 		'https://api.whatsapp.com/send?phone=+573127411293&text=hola'
  // 	);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.footer1}>
        <div className={styles.logo}>
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        <div className={styles.btn}>
          <a
            href="https://www.instagram.com/accounts/login/?next=/calyaancol/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="images" />
          </a>

          <a
            href="https://www.facebook.com/Calyaan-105376747798392"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="images" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCJNVxAjRm23sU7Q8ylvYxWA"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtube} alt="images" />
          </a>
          <a
            href="https://co.pinterest.com/calyaancol/_created/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={pinteres} alt="images" />
          </a>
        </div>
      </div>

      <div className={styles.footer2}>
        <h2>Calyaan</h2>
        <ul>
          <a
            href="https://calyaan.com/quienes-somos/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li> Nosotros</li>
          </a>
          <a
            href="https://calyaan.com/contactanos/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li> Contacto</li>
          </a>
          <a
            href="https://calyaan.com/colaboradores/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>Trabaja con nosotros</li>
          </a>
          <a
            href="https://calyaan.com/blog/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li> Blog</li>
          </a>
        </ul>
      </div>

      <div className={styles.footer3}>
        <h2>Contáctanos</h2>
        <ul>
          <a
            href="https://calyaan.com/empresarial/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>Servicios Corporativos</li>
          </a>

          <a
            href="https://calyaan.com/privacidad/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>Privacidad</li>
          </a>
          <a
            href="https://calyaan.com/habeas-data/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>Habeas Data</li>
          </a>
          <a
            href="https://calyaan.com/entra-al-panel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li>Panel de Profesionales</li>
          </a>
        </ul>
      </div>

      <div className={styles.footer4}>
        <h2>whatsApp</h2>

        <h3> (+57)3147428757</h3>

        <h3>Calyaan.com@gmail.com</h3>
      </div>

      {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
    </div>
  );
}

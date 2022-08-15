import { useSelector } from 'react-redux';
import ChatBox from '../components/ChatBox.js';
import styles from '../style/Footer.module.css';
import pinteres from '../assent/pinteres.png';
import youtube from '../assent/youtube.png';
import facebook from '../assent/facebook.png';
import instagram from '../assent/instagram.png';
import whatsApp from '../assent/whatsApp1.png';
import logo3 from '../assent/LOGO34.png';
import correo from '../assent/correo.png';

export default function Footer() {
	const userSignin = useSelector(state => state.userSignin);
	const { userInfo } = userSignin;
	// const goWhatsApp = () => {
	// 	window.location.replace(
	// 		'https://api.whatsapp.com/send?phone=+573127411293&text=hola'
	// 	);
	// };

	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<img src={logo3} alt='Logo' />
			</div>
			<div className={styles.container1}>
				{/* <div className={styles.footer1}>
					<h2>CATEGORIAS</h2>
					<ul>
						<NavLink to='/service'>
							{' '}
							<li>Servicio en Bogota</li>
						</NavLink>
					</ul>
				</div> */}

				<div className={styles.footer2}>
					<h2>CALYAAN</h2>
					<ul>
						<a
							href='https://calyaan.com/quienes-somos/'
							target='_blank'
							rel='noopener noreferrer'
						>
							<li> Nosotros</li>
						</a>
						<a
							href='https://calyaan.com/contactanos/'
							target='_blank'
							rel='noopener noreferrer'
						>
							<li> Contacto</li>
						</a>
						<a
							href='https://calyaan.com/blog/'
							target='_blank'
							rel='noopener noreferrer'
						>
							<li> Blog</li>
						</a>
					</ul>
				</div>

				<div className={styles.footer3}>
					<h2>ENLACES</h2>
					<ul>
						<a
							href='https://calyaan.com/empresarial/'
							target='_blank'
							rel='noopener noreferrer'
						>
							<li>Servicios Corporativos</li>
						</a>
						<a
							href='https://calyaan.com/colaboradores/'
							target='_blank'
							rel='noopener noreferrer'
						>
							<li>Trabaja con nosotros</li>
						</a>
						<a
							href='https://calyaan.com/privacidad/'
							target='_blank'
							rel='noopener noreferrer'
						>
							<li>Privacidad</li>
						</a>
						<a
							href='https://calyaan.com/habeas-data/'
							target='_blank'
							rel='noopener noreferrer'
						>
							<li>Habeas Data</li>
						</a>
						<a
							href='https://calyaan.com/entra-al-panel/'
							target='_blank'
							rel='noopener noreferrer'
						>
							<li>Panel de Profesionales</li>
						</a>
					</ul>
				</div>

				<div className={styles.Footer5}>
					<h2>CONTÁCTANOS</h2>
					<div className={styles.imgW}>
						<img src={whatsApp} />
						<h3> (+57)3147428757</h3>
					</div>
					<div className={styles.imgW}>
						<img src={correo} />
						<h3>Calyaan.com@gmail.com</h3>
					</div>
				</div>
			</div>
			<div className={styles.footer4}>
				<h2>SÍGUENOS</h2>
				<div className={styles.btn}>
					<a
						href='https://www.instagram.com/accounts/login/?next=/calyaancol/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img src={instagram} />
						<h3>@Calyaancol</h3>
					</a>

					<a
						href='https://www.facebook.com/Calyaan-105376747798392'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img src={facebook} />
						<h3>Calyaan</h3>
					</a>
					<a
						href='https://www.youtube.com/channel/UCJNVxAjRm23sU7Q8ylvYxWA'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img src={youtube} />
						<h3>Calyaan</h3>
					</a>
					<a
						href='https://co.pinterest.com/calyaancol/_created/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<img src={pinteres} />
						<h3>Calyaancol</h3>
					</a>
				</div>
			</div>

			{userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
		</div>
	);
}

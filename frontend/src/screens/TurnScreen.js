import React, {useState} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { createTurn } from '../actions/turnAction.js'
//import { NavLink } from 'react-router-dom';
//import styles from './Landing.module.css';

export default function TurnScreen (props, order){
//console.log('order', order)    
console.log('props de screen', props)
//console.log('servicios desde props', props.orderItems[0].name)
const service = props.order.orderItems.map((service)=>{
return {
    name: service.name,
    price: service.price,
    qty: service.qty
}});

console.log('servicios', service)
console.log('servicios desde props', props.order.orderItems)


const userSignin = useSelector((state) => state.userSignin);
const { userInfo } = userSignin;
const dispatch = useDispatch();
console.log('informacion de usuario', userInfo)

//const turnCreate = useSelector((state) => state.turnCreate);

//const { loading, success, error, order } = turnCreate;

const [turn, setTurn] = useState({
    seller: props.order.seller,        
    day: '',
    hour: '',
    status:false,
    user:props.order.user,
    orderId: props.order._id,
//    shippinAddres:props.order.shippingAddress,
    fullName: props.order.shippingAddress.fullName,
    address: props.order.shippingAddress.address,
    city: props.order.shippingAddress.city,
    postalCode: props.order.shippingAddress.postalCode,
    country: props.order.shippingAddress.country,
    service:service
    
});

const handleChange = (e) => {
    setTurn({
        ...turn,
        [e.target.name]: e.target.value,
    });
    console.log('este es el turno', turn)
};

const handleSubmit = async (e) => {
    e.preventDefault();
   if (dispatch (createTurn(turn))) 
   alert('Turno creado con exito')
//   props.history.push(`/order/${order._id}`) 
};

// useEffect(() => {
//     if (success) {
//       props.history.push(`/order/${order._id}`)
//       //props.history.push(`/order/${order._id}`);
//       //dispatch({ type: TURN_CREATE_RESET });
//     }
//   }, [dispatch, success]);
console.log('turno creado', turn)
return (
    
    <form onSubmit={handleSubmit}>
       <h1>Elije la fecha y hora para agendar su turno (solo aplica para solicitud de servicios y no de productos)</h1>
        <div>
            <label>Selecciona la Fecha</label>
            <input type="date" name="day" onChange={handleChange} />
        </div>

        <div>
            <label>Selecciona la Hora</label>
                
            <select name="hour" onChange={handleChange}>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="15:00 PM">15:00 PM</option>
                <option value="16:00 PM">16:00 PM</option>
                <option value="17:00 PM">17:00 PM</option>
                <option value="18:00 PM">18:00 PM</option>
            </select>
           
        </div>
        <input type="submit" value="Enviar Turno" />
    </form>
);};


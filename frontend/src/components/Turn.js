import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTurn } from '../actions/turnAction';


export default function Turn(props) {
  const { turn } = props;
  console.log('estos son los turnos', turn)
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

const nameService= turn.service.map((servi)=>{
  return servi.name })
const priceService = turn.service.map((servi)=>{
  return servi.price })
const qtyService = turn.service.map((servi)=>{
    return servi.qty })

const handleAcceptor=(turn)=>{
 
  console.log('este es id', turn)
  if (window.confirm('¿Desea aceptar el turno?')) {
    dispatch(updateTurn(turn));
  }
  window.location.replace('');
}

// useEffect (()=>{
//   //
  
// }, [dispatch,handleAcceptor] )
  

    return (
<table className="table">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>DIRECCION</th>
            <th>CIUDAD</th>
            <th>FECHA</th>
            <th>HORA</th>
            <th>SERVICIO</th>
            <th>PRECIO</th>
            <th>CANTIDAD</th>
            <th>ESTADO</th>
            </tr>
        </thead>
        <tbody>
        <td>{turn.fullName}</td>
        <td>{turn.address}</td>
        <td>{turn.city}</td>
        <td>{turn.day}</td>
        <td>{turn.hour}</td>
        <td>{nameService}</td>
        <td>{priceService}</td>
        <td>{qtyService}</td>   
        <td>{!turn.status? <p>Pendiente</p>:
        <p>Aceptado</p>
        }</td>

              <td>
                <button
                  type="button"
                  className="small"
                  onClick={()=>handleAcceptor(turn._id)}
                >
                  Aceptar servicio
                </button>
                <button
                  type="button"
                  className="small"
                >
                  Eliminar Turno
                </button>
              </td>
          
        </tbody>
      </table>

  );
}

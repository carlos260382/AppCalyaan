import React from 'react';
import { Link } from 'react-router-dom';


export default function Turn(props) {
  const { turn } = props;
  console.log('estos son los turnos', turn)
const nameService= turn.service.map((servi)=>{
  return servi.name })
const priceService = turn.service.map((servi)=>{
  return servi.price })
const qtyService = turn.service.map((servi)=>{
    return servi.qty })

const handleAcceptor=(turn)=>{
  if (window.confirm('¿Desea eliminar el turno?')) {
    dispatch(deleteService(turn._id));
  }
}

  

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
                >
                  Aceptar servicio
                </button>
                <button
                  type="button"
                  className="small"
                  onClick={() => handleAcceptor(turn)}
                >
                  Eliminar Turno
                </button>
              </td>
          
        </tbody>
      </table>

  );
}

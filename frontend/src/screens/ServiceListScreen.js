import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  createService,
  deleteService,
  listService,
} from '../actions/serviceActions';
import {
  SERVICE_CREATE_RESET,
  SERVICE_DELETE_RESET,
} from '../constants/serviceConstants';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const serviceList = useSelector((state) => state.serviceList);
  const { loading, error, services, page, pages } = serviceList;

  const serviceCreate = useSelector((state) => state.serviceCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    service: createdService,
  } = serviceCreate;

  const serviceDelete = useSelector((state) => state.serviceDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = serviceDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: SERVICE_CREATE_RESET });
      props.history.push(`/service/${createdService._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: SERVICE_DELETE_RESET });
    }
    dispatch(
      listService({ seller: sellerMode ? userInfo._id : '', pageNumber })
    );
  }, [
    createdService,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

 
const deleteHandlerService = (service) => {
    if (window.confirm('¿Desea eliminar el servicio?')) {
      dispatch(deleteService(service._id));
    }
  };


  const createHandlerService = () => {
    dispatch(createService());
  };
console.log('este es el service', serviceList)
console.log('este es el error', error)

return (
  <div>
    <div className="row">
      <h1>servicio</h1>
      <button type="button" className="primary" onClick={createHandlerService}>
        Crear servicio
      </button>
    </div>

    {loadingDelete && <LoadingBox></LoadingBox>}
    {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

    {loadingCreate && <LoadingBox></LoadingBox>}
    {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <>
<table className="table">
<thead>
  <tr>
    <th>ID</th>
    <th>SERVICIO</th>
    <th>PRECIO</th>
    <th>CATEGORIA</th>
    <th>CIUDAD</th>
    <th>ACTIONS</th>
  </tr>
</thead>
<tbody>
  {services.map((service) => (
    <tr key={service._id}>
      <td>{service._id}</td>
      <td>{service.name}</td>
      <td>{service.price}</td>
      <td>{service.category}</td>
      <td>{service.city}</td>
      <td>
        <button
          type="button"
          className="small"
          onClick={() =>
            props.history.push(`/service/${service._id}/edit`)
          }
        >
          Editar
        </button>
        <button
          type="button"
          className="small"
          onClick={() => deleteHandlerService(service)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>



<div className="row center pagination">
{[...Array(pages).keys()].map((x) => (
  <Link
    className={x + 1 === page ? 'active' : ''}
    key={x + 1}
    to={`/productlist/pageNumber/${x + 1}`}
  >
    {x + 1}
  </Link>
))}
</div>
</>
)}
</div>
);
}

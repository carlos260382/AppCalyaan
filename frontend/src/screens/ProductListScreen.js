import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';
import {
  createService,
  deleteService,
  listService,
} from '../actions/serviceActions';
import {
  SERVICE_CREATE_RESET,
  SERVICE_DELETE_RESET,
} from '../constants/serviceConstants';



export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const serviceList = useSelector((state) => state.serviceList);
  const { loadingService, errorService, services, pageService, pagesService } = serviceList;


  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const serviceCreate = useSelector((state) => state.serviceCreate);
  const {
    loading: loadingCreateService,
    error: errorCreateService,
    success: successCreateService,
    service: createdService,
  } = serviceCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const serviceDelete = useSelector((state) => state.serviceDelete);
  const {
    loading: loadingDeleteService,
    error: errorDeleteService,
    success: successDeleteService,
  } = serviceDelete;



  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successCreateService) {
      dispatch({ type: SERVICE_CREATE_RESET });
      props.history.push(`/service/${createdService._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    if (successDeleteService) {
      dispatch({ type: SERVICE_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : '', pageNumber }),
      listService({ seller: sellerMode ? userInfo._id : '', pageNumber })
    );
  }, [
    createdProduct,
    createService,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    successCreateService,
    successDeleteService,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  
  const deleteHandlerService = (service) => {
    if (window.confirm('¿Desea eliminar el servicio?')) {
      dispatch(deleteService(service._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  const createHandlerService = () => {
    dispatch(createService());
  };

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
      </div>
      <div className="row">
        <h1>Servicios</h1>
        <button type="button" className="primary" onClick={createHandlerService}>
          Crear Servicios
        </button>
      </div>


      {loadingDelete ||loadingDeleteService && <LoadingBox></LoadingBox>}
      {errorDelete || errorDeleteService && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate ||loadingCreateService && <LoadingBox></LoadingBox>}
      {errorCreate || errorCreateService && <MessageBox variant="danger">{errorCreate}</MessageBox>}
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
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          
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

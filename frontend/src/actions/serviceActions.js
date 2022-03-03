import Axios from 'axios';
import {
  SERVICE_CREATE_FAIL,
  SERVICE_CREATE_REQUEST,
  SERVICE_CREATE_SUCCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_UPDATE_FAIL,
  SERVICE_DELETE_REQUEST,
  SERVICE_DELETE_FAIL,
  SERVICE_DELETE_SUCCESS,
  SERVICE_CATEGORY_LIST_SUCCESS,
  SERVICE_CATEGORY_LIST_REQUEST,
  SERVICE_CATEGORY_LIST_FAIL,
  SERVICE_REVIEW_CREATE_REQUEST,
  SERVICE_REVIEW_CREATE_SUCCESS,
  SERVICE_REVIEW_CREATE_FAIL,
} from '../constants/serviceConstants';

export const listService = ({
  pageNumber = '',
  seller = '',
  name = '',
  category = '',
  order = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: SERVICE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `http://localhost:5000/api/services?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
    );
    dispatch({ type: SERVICE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SERVICE_LIST_FAIL, payload: error.message });
  }
};

export const listServiceCategories = () => async (dispatch) => {
  dispatch({
    type: SERVICE_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`http://localhost:5000/api/services/categories`);
    dispatch({ type: SERVICE_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SERVICE_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsService = (serviceId) => async (dispatch) => {
  dispatch({ type: SERVICE_DETAILS_REQUEST, payload: serviceId });
  try {
    const { data } = await Axios.get(`http://localhost:5000/api/services/${serviceId}`);
    dispatch({ type: SERVICE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SERVICE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createService = () => async (dispatch, getState) => {
  dispatch({ type: SERVICE_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      'http://localhost:5000/api/services',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: SERVICE_CREATE_SUCCESS,
      payload: data.service,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SERVICE_CREATE_FAIL, payload: message });
  }
};
export const updateService = (service) => async (dispatch, getState) => {
  dispatch({ type: SERVICE_UPDATE_REQUEST, payload: service });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`http://localhost:5000/api/services/${service._id}`, service, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: SERVICE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SERVICE_UPDATE_FAIL, error: message });
  }
};
export const deleteService = (serviceId) => async (dispatch, getState) => {
  dispatch({ type: SERVICE_DELETE_REQUEST, payload: serviceId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`http://localhost:5000/api/services/${serviceId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: SERVICE_DELETE_SUCCESS, payload:data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SERVICE_DELETE_FAIL, payload: message });
  }
};
export const createReview = (serviceId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: SERVICE_REVIEW_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `http://localhost:5000/api/services/${serviceId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: SERVICE_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SERVICE_REVIEW_CREATE_FAIL, payload: message });
  }
};

import Axios from 'axios';

import { GET_TURNS, 
  GET_TURN_DETAIL, 
  TURN_CREATE_SUCCESS, 
  TURN_CREATE_REQUEST, 
  TURN_CREATE_FAIL, 
  TURN_LIST_REQUEST,
  TURN_LIST_SUCCESS,
  TURN_LIST_FAIL,
  TURN_UPDATE_REQUEST,
  TURN_UPDATE_SUCCESS, 
  TURN_UPDATE_FAIL,
  TURN_DELETE_REQUEST,
  TURN_DELETE_SUCCESS,
  TURN_DELETE_FAIL,
  TURN_GET_REQUEST,
  TURN_GET_SUCCESS,
  TURN_GET_FAIL} from '../constants/turnConstant';


export const createTurn = (turn) => async (dispatch, getState) => {
  dispatch({ type: TURN_CREATE_REQUEST, payload: turn });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('http://localhost:5000/api/turn', turn, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: TURN_CREATE_SUCCESS, payload: data.turn });
    //dispatch({ type: CART_EMPTY });
    //localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: TURN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }

};

export const listTurns = () => async (dispatch) => {
  dispatch({
    type: TURN_LIST_REQUEST,
  });
  try {
    const  data  = await Axios.get(
      'http://localhost:5000/api/turn'
    );
    dispatch({ type: TURN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TURN_LIST_FAIL, payload: error.message });
  }
};

export const updateTurn = (id) => async (dispatch, getState) => {
  dispatch({ type: TURN_UPDATE_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`http://localhost:5000/api/turn/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TURN_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TURN_UPDATE_FAIL, error: message });
  }
};


export const deleteTurn = (id) => async (dispatch, getState) => {
  dispatch({ type: TURN_DELETE_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`http://localhost:5000/api/turn/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TURN_DELETE_SUCCESS, payload:data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TURN_DELETE_FAIL, payload: message });
  }
};

export const getTurn = (id) => async (dispatch, getState) => {
  dispatch({ type: TURN_GET_REQUEST, payload: id });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`http://localhost:5000/api/turn/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TURN_GET_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TURN_GET_FAIL, error: message });
  }
};



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
  TURN_DELETE_FAIL} from '../constants/turnConstant';


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



// !carlos
export function getTurn(id) {
    return async function (dispatch) {
        try {
            let resul = await Axios.get(`http://localhost:5000/api/turn`);
            return dispatch({
                type: GET_TURNS,
                payload: resul.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

// !carlos
export const setTurn = (turn) => {
    return async function () {
        try {
            let resul = await Axios.post('http://localhost:5000/api/turn', turn);
            if (resul) alert(resul.data);
        } catch (error) {
            console.log(error);
        }
    };
};

// !carlos
export function getTurnDetail(id) {
    return function (dispatch) {
        Axios
            .get(`http://localhost:5000/api/turn/${id}`)
            .then((response) => {
                return dispatch({
                    type: GET_TURN_DETAIL,
                    payload: response.data,
                });
            })
            .catch((datos) => console.error(datos));
    };
}

import Axios from 'axios';

import { GET_TURNS, GET_TURN_DETAIL, TURN_CREATE_SUCCESS, TURN_CREATE_REQUEST, TURN_CREATE_FAIL } from '../constants/turnConstant';


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


// export const createTurn = () => async (dispatch, getState) => {
//     dispatch({ type: TURN_CREATE_REQUEST });
//     const {
//       userSignin: { userInfo },
//     } = getState();
//     try {
//       const { data } = await Axios.post(
//         'http://localhost:5000/api/turn',
//         {},
//         {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         }
//       );
//       dispatch({
//         type: TURN_CREATE_SUCCESS,
//         payload: data.turn,
//       });
//     } catch (error) {
//       const message =
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message;
//       dispatch({ type: TURN_CREATE_FAIL, payload: message });
//     }
//   };




export const get_turns = (userId) => {
    // return async function (dispatch) {
    //     const res = await fetch(`api/users/${userId}`, {
    //         headers: { Authorization: `Bearer ${userInfo?.token}` },
    //     });

    //     const { turns } = await res.json();
    //     dispatch({
    //         type: GET_TURNS,
    //         payload: turns,
    //     });
    // };
};

// !carlos
export function getTurn() {
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

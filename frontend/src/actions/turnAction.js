import Axios from 'axios';

import { GET_TURNS, GET_TURN_DETAIL } from '../constants/turnConstant';

export const get_turns = (userId) => {
    return async function (dispatch) {
        const res = await fetch(`api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
        });

        const { turns } = await res.json();
        dispatch({
            type: GET_TURNS,
            payload: turns,
        });
    };
};

// !carlos
export function getTurn() {
    return async function (dispatch) {
        try {
            let resul = await axios.get(`http://localhost:3001/turn`);
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
            let resul = await axios.post('http://localhost:3001/turn', turn);
            if (resul) alert(resul.data);
        } catch (error) {
            console.log(error);
        }
    };
};

// !carlos
export function getTurnDetail(id) {
    return function (dispatch) {
        axios
            .get(`http://localhost:3001/turn/${id}`)
            .then((response) => {
                return dispatch({
                    type: GET_TURN_DETAIL,
                    payload: response.data,
                });
            })
            .catch((datos) => console.error(datos));
    };
}

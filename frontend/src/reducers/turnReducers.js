const { SET_USER, GET_TURNS, GET_TURN_DETAIL } = require('../constants/turnConstant');;


export default function getTurnReducer(
  state = { loading: true, turns: [], user: false, DetailTurn:[] },
  action) {
    if (action.type === SET_USER) {
        return {
            ...state,
            user: true,
        };
    }

    if (action.type === GET_TURNS) {
        return {
            ...state,
            turns: action.payload,
        };
    }

    if (action.type === GET_TURN_DETAIL) {
        return {
            ...state,
            DetailTurn: action.payload,
        };
    }

    return state;
}

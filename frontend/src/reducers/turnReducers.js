const {  
  TURN_CREATE_REQUEST, 
  TURN_CREATE_SUCCESS, 
  TURN_CREATE_FAIL, 
  TURN_CREATE_RESET,
  TURN_LIST_REQUEST,
  TURN_LIST_SUCCESS,
  TURN_LIST_FAIL } = require('../constants/turnConstant');


export const turnCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case TURN_CREATE_REQUEST:
        return { loading: true };
      case TURN_CREATE_SUCCESS:
        return { loading: false, success: true, turn: action.payload };
      case TURN_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case TURN_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const turnListReducer = (
    state = { loading: true, turns: [] },
    action
  ) => {
    switch (action.type) {
      case TURN_LIST_REQUEST:
        return { loading: true };
      case TURN_LIST_SUCCESS:
        return {
          loading: false,
          turns: action.payload.data,
          // pages: action.payload.pages,
          // page: action.payload.page,
        };
      case TURN_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };





// export default function getTurnReducer(
//   state = { loading: true, turns: [], user: false, DetailTurn:[] },
//   action) {
//     if (action.type === SET_USER) {
//         return {
//             ...state,
//             user: true,
//         };
//     }

//     if (action.type === GET_TURNS) {
//         return {
//             ...state,
//             turns: action.payload,
//         };
//     }

//     if (action.type === GET_TURN_DETAIL) {
//         return {
//             ...state,
//             DetailTurn: action.payload,
//         };
//     }

//     return state;
// }

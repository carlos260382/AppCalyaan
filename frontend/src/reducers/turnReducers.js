const {  
  TURN_CREATE_REQUEST, 
  TURN_CREATE_SUCCESS, 
  TURN_CREATE_FAIL, 
  TURN_CREATE_RESET,
  TURN_LIST_REQUEST,
  TURN_LIST_SUCCESS,
  TURN_LIST_FAIL,
  TURN_UPDATE_REQUEST,
  TURN_UPDATE_SUCCESS, 
  TURN_UPDATE_FAIL,
  TURN_UPDATE_RESET,
  TURN_DELETE_REQUEST,
  TURN_DELETE_SUCCESS,
  TURN_DELETE_FAIL,
  TURN_DELETE_RESET,
  TURN_GET_REQUEST,
  TURN_GET_SUCCESS,
  TURN_GET_FAIL,
  TURN_GET_RESET } = require('../constants/turnConstant');


export const turnCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case TURN_CREATE_REQUEST:
        return { loadingTurn: true };
      case TURN_CREATE_SUCCESS:
        return { loadingTurn: false, success: true, turn: action.payload };
      case TURN_CREATE_FAIL:
        return { loadingTurn: false, error: action.payload };
      case TURN_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const turnListReducer = (
    state = { loadingTurn: true, turns: [] },
    action
  ) => {
    switch (action.type) {
      case TURN_LIST_REQUEST:
        return { loadingTurn: true };
      case TURN_LIST_SUCCESS:
        return {
          loadingTurn: false,
          turns: action.payload.data,
          // pages: action.payload.pages,
          // page: action.payload.page,
        };
      case TURN_LIST_FAIL:
        return { loadingTurn: false, error: action.payload };
      default:
        return state;
    }
  };

  export const turnUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case TURN_UPDATE_REQUEST:
        return { loadingTurn: true };
      case TURN_UPDATE_SUCCESS:
        return { loadingTurn: false, success: true };
      case TURN_UPDATE_FAIL:
        return { loadingTurn: false, error: action.payload };
      case TURN_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const turnGetReducer = (state = {loadingTurn: true, turns: {}}, action) => {
    switch (action.type) {
      case TURN_GET_REQUEST:
        return { loadingTurn: true };
      case TURN_GET_SUCCESS:
        return { loadingTurn: false, turns: action.payload.data, };
      case TURN_GET_FAIL:
        return { loadingTurn: false, error: action.payload };
      case TURN_GET_RESET:
        return {};
      default:
        return state;
    }
  };


  export const turnDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case TURN_DELETE_REQUEST:
        return { loadingTurn: true };
      case TURN_DELETE_SUCCESS:
        return { loadingTurn: false, success: true };
      case TURN_DELETE_FAIL:
        return { loadingTurn: false, error: action.payload };
      case TURN_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };

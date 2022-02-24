const {
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_CREATE_REQUEST,
  SERVICE_CREATE_SUCCESS,
  SERVICE_CREATE_FAIL,
  SERVICE_CREATE_RESET,
  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_UPDATE_FAIL,
  SERVICE_UPDATE_RESET,
  SERVICE_DELETE_REQUEST,
  SERVICE_DELETE_SUCCESS,
  SERVICE_DELETE_FAIL,
  SERVICE_DELETE_RESET,
  SERVICE_CATEGORY_LIST_REQUEST,
  SERVICE_CATEGORY_LIST_SUCCESS,
  SERVICE_CATEGORY_LIST_FAIL,
  SERVICE_REVIEW_CREATE_REQUEST,
  SERVICE_REVIEW_CREATE_SUCCESS,
  SERVICE_REVIEW_CREATE_FAIL,
  SERVICE_REVIEW_CREATE_RESET,
} = require('../constants/serviceConstants');

export const serviceListReducer = (
  state = { loading: true, services: [] },
  action
) => {
  switch (action.type) {
    case SERVICE_LIST_REQUEST:
      return { loading: true };
    case SERVICE_LIST_SUCCESS:
      return {
        loading: false,
        services: action.payload.services,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case SERVICE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const serviceCategoryListReducer = (
  state = { loading: true, services: [] },
  action
) => {
  switch (action.type) {
    case SERVICE_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case SERVICE_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case SERVICE_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const serviceDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SERVICE_DETAILS_REQUEST:
      return { loading: true };
    case SERVICE_DETAILS_SUCCESS:
      return { loading: false, SERVICE: action.payload };
    case SERVICE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const serviceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_CREATE_REQUEST:
      return { loading: true };
    case SERVICE_CREATE_SUCCESS:
      return { loading: false, success: true, SERVICE: action.payload };
    case SERVICE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SERVICE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const serviceUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_UPDATE_REQUEST:
      return { loading: true };
    case SERVICE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SERVICE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SERVICE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const serviceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_DELETE_REQUEST:
      return { loading: true };
    case SERVICE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SERVICE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case SERVICE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const serviceReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case SERVICE_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case SERVICE_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SERVICE_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

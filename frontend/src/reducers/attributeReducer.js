import {
  ALL_ATTRIBUTE_REQUEST,
  ALL_ATTRIBUTE_SUCCESS,
  ALL_ATTRIBUTE_FAIL,
  CREATE_ATTRIBUTE_REQUEST,
  CREATE_ATTRIBUTE_SUCCESS,
  CREATE_ATTRIBUTE_FAIL,
  CREATE_ATTRIBUTE_RESET,
  UPDATE_ATTRIBUTE_REQUEST,
  UPDATE_ATTRIBUTE_SUCCESS,
  UPDATE_ATTRIBUTE_FAIL,
  UPDATE_ATTRIBUTE_RESET,
  DELETE_ATTRIBUTE_REQUEST,
  DELETE_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_FAIL,
  DELETE_ATTRIBUTE_RESET,
  CLEAR_ERRORS,
  ATTRIBUTE_DETAILS_REQUEST,
  ATTRIBUTE_DETAILS_SUCCESS,
  ATTRIBUTE_DETAILS_FAIL,
} from "../constants/attributeConstants";

export const attributesReducer = (state = { attributes: [] }, action) => {
  switch (action.type) {
    case ALL_ATTRIBUTE_REQUEST:
      return {
        loading: true,
        categories: [],
      };
    case ALL_ATTRIBUTE_SUCCESS:
      return {
        loading: false,
        attributes: action.payload,
      };
    case ALL_ATTRIBUTE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const attributeDetailsReducer = (state = { attribute: {} }, action) => {
  switch (action.type) {
    case ATTRIBUTE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ATTRIBUTE_DETAILS_SUCCESS:
      return {
        loading: false,
        attribute: action.payload,
      };
    case ATTRIBUTE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newAttributeReducer = (state = { attribute: {} }, action) => {
  switch (action.type) {
    case CREATE_ATTRIBUTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ATTRIBUTE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        attribute: action.payload.attribute,
      };
    case CREATE_ATTRIBUTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_ATTRIBUTE_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const attributeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ATTRIBUTE_REQUEST:
    case UPDATE_ATTRIBUTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_ATTRIBUTE_FAIL:
    case UPDATE_ATTRIBUTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ATTRIBUTE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_ATTRIBUTE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

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

import axios from "axios";

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

// Get All Categories
export const getAllAttributes = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ATTRIBUTE_REQUEST });

    const { data } = await axios.get("/api/v1/attributes");

    dispatch({
      type: ALL_ATTRIBUTE_SUCCESS,
      payload: data.attributes,
    });
  } catch (error) {
    dispatch({
      type: ALL_ATTRIBUTE_FAIL,
      payload: error.response.data.message,
    });
  }
};
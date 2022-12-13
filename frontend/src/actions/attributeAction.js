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
  ATTRIBUTE_DETAILS_REQUEST,
  ATTRIBUTE_DETAILS_SUCCESS,
  ATTRIBUTE_DETAILS_FAIL,
} from "../constants/attributeConstants";

// Get All Attributes
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

// Get Attribute's Details
export const getAttributeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ATTRIBUTE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/attribute/${id}`);

    dispatch({
      type: ATTRIBUTE_DETAILS_SUCCESS,
      payload: data.attribute,
    });
  } catch (error) {
    dispatch({
      type: ATTRIBUTE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Attribute
export const createAttribute = (AttributeData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ATTRIBUTE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/attribute/new`,
      AttributeData,
      config
    );

    dispatch({
      type: CREATE_ATTRIBUTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ATTRIBUTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Attribute
export const updateAttribute = (id, attributeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ATTRIBUTE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/attribute/${id}`,
      attributeData,
      config
    );

    dispatch({
      type: UPDATE_ATTRIBUTE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ATTRIBUTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Attribute
export const deleteAttribute = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ATTRIBUTE_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/attribute/${id}`);

    dispatch({
      type: DELETE_ATTRIBUTE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ATTRIBUTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

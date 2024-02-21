import * as actionTypes from './actionTypes';



// actions.js

export const uploadTextRequest = (data) => ({
  type: actionTypes.UPLOAD_TEXT_REQUEST,
  payload: data,
});

export const uploadTextSuccess = (response) => ({
  type: actionTypes.UPLOAD_TEXT_SUCCESS,
  payload: response,
});

export const uploadTextFailure = (error) => ({
  type: actionTypes.UPLOAD_TEXT_FAILURE,
  payload: error,
});



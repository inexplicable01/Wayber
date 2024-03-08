import * as actionTypes from "./actionTypes";

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

export const setUserDetails = (userDetails) => {
  return {
    type: actionTypes.SET_USER_DETAILS,
    payload: userDetails,
  };
};

export const fetchProfilesStart = () => ({
  type: actionTypes.FETCH_PROFILES_START,
});

export const fetchProfilesSuccess = profiles => ({
  type: actionTypes.FETCH_PROFILES_SUCCESS,
  payload: profiles,
});

export const fetchProfilesFailure = error => ({
  type: actionTypes.FETCH_PROFILES_FAILURE,
  payload: error,
});


export const fetchApiDataRequest = () => ({
  type: actionTypes.FETCH_API_DATA_REQUEST,
});

// Action creator for successful API data fetch
export const fetchApiDataSuccess = (data) => ({
  type: actionTypes.FETCH_API_DATA_SUCCESS,
  payload: data,
});

// Action creator for failed API data fetch
export const fetchApiDataFailure = (error) => ({
  type: actionTypes.FETCH_API_DATA_FAILURE,
  payload: error,
});



export const getUsersAddressRequest = (zpid) => ({
  type: actionTypes.GET_USER_DETAILS_REQUEST,
  payload: zpid
});

export const getUsersAddressSuccess = (data) => ({
  type: actionTypes.GET_USER_DETAILS_SUCCESS,
  payload: data,
});

export const getUsersAddressFailure = (error) => ({
  type: actionTypes.GET_USER_DETAILS_FAILURE,
  payload: error,
});

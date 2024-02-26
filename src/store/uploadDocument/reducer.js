// reducer.js
import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
  userDetails: {},
  firebase: {
    profiles: [],
    loading: false,
    error: null,
  },
};

const textUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_TEXT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case actionTypes.UPLOAD_TEXT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false,
        success: true,
      };
    case actionTypes.UPLOAD_TEXT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case actionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case actionTypes.FETCH_PROFILES_START:
      return {
        ...state,
        firebase: {
          ...state.firebase,
          loading: true,
          error: null,
        },
      };
    case actionTypes.FETCH_PROFILES_SUCCESS:
      return {
        ...state,
        firebase: {
          ...state.firebase,
          loading: false,
          profiles: action.payload,
          error: null,
        },
      };
    case actionTypes.FETCH_PROFILES_FAILURE:
      return {
        ...state,
        firebase: {
          ...state.firebase,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default textUploadReducer;

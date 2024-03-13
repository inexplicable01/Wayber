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
  api: {
    data: null,
    loading: false,
    error: null,
    success: null,
  },
  userZPID: {
    details: null,
    loading: false,
    error: false,
    success: false,
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
    case actionTypes.FETCH_API_DATA_REQUEST:
      return {
        ...state,
        api: {
          ...state.api,
          loading: true,
          error: null,
          success: false,
        },
      };
    case actionTypes.FETCH_API_DATA_SUCCESS:
      return {
        ...state,
        api: {
          ...state.api,
          loading: false,
          data: action.payload,
          success: true,
          error: false,
        },
      };
    case actionTypes.FETCH_API_DATA_FAILURE:
      return {
        ...state,
        api: {
          ...state.api,
          loading: false,
          error: true,
          success: false,
        },
      };
    case actionTypes.GET_USER_DETAILS_REQUEST:
      return {
        ...state,
        userZPID: {
          ...state.userZPID,
          loading: true,
          error: false,
          success: false,
        },
      };
    case actionTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userZPID: {
          ...state.userZPID,
          loading: false,
          details: action.payload,
          error: false,
          success: true,
        },
      };
    case actionTypes.GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        userZPID: {
          ...state.userZPID,
          loading: false,
          details: action.payload,
          error: true,
          success: false,
        },
      };
    case "CLEAR_MODAL_CONTENT":
      return {
        ...state,

        data: null,
      };
    default:
      return state;
  }
};

export default textUploadReducer;

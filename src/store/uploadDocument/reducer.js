// reducer.js
import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

const textUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_TEXT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
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
    default:
      return state;
  }
};

export default textUploadReducer;

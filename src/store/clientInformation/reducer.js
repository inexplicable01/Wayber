import * as actionTypes from "./actionTypes";

const initialState = {
  loading: false,
  error: null, 
  success: false,
  profiles: [],
  details:{
    loading: false,
    error: null, 
    success: false,
  }
};

const clientInformationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CLIENT_INFORMATION_START:
      return {
        ...state,
        loading: true,
        error: null, 
      };
    case actionTypes.FETCH_CLIENT_INFORMATION_SUCCESS:
      return {
        ...state,
        loading: false,
        profiles: action.payload,
        error: null,
      };
    case actionTypes.FETCH_CLIENT_INFORMATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, 
      };
case actionTypes.SUBMIT_INFORMATION:
  return {
    ...state,
    details: {
      ...state.details,
      loading: true,
      error: null,
      success: false,
    },
  };
  case actionTypes.SUBMIT_INFORMATION_SUCCESS:
    return {
      ...state,
      details: {
        ...state.details,
        loading: false,
        error: null,
        success: "Form submitted successfully!",
      },
    };
    case actionTypes.SUBMIT_INFORMATION_FAILURE:
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          error: action.payload,
          success: false,
        },
      };
    case "CLEAR_MODAL_CONTENT":
      return {
        ...initialState,
      };
      
    default:
      return state;
  }
};

export default clientInformationReducer;

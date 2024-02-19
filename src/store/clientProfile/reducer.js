import * as actionTypes from "./actionTypes";

// Define the initial state of the form
const initialState = {
  firstName: "",
  middleName: "",
  lastName: "",
  age: "",
  email: "",
  estimatedAnnualIncome: "",
  currentAddress: "",
  desiredLocation: "",
  loading: false,
  error: null,
  success: null,
  contractinfoready: false,
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

// The form reducer function
const clientProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_FORM:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case actionTypes.SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "Form submitted successfully!",
      };
    case actionTypes.SUBMIT_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.RESET_SUCCESS_STATE:
      return {
        ...state,
        success: null,
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
          error:false,
          success: true,
        },
      };
    case actionTypes.GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        userZPID: {
          ...state.userZPID,
          loading: false,
          error: true,
          success: false,
        },
      };
    default:
      return state;
  }
};

export default clientProfileReducer;

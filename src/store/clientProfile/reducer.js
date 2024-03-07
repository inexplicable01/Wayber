import * as actionTypes from "./actionTypes";

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
    default:
      return state;
  }
};

export default clientProfileReducer;

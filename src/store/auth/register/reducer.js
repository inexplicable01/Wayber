import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  RESET_REGISTER_FLAG
} from "./actionTypes";

const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  success: false,
  error: false
};

const Registration = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        loading: true,
        registrationError: null,
      };
      break;
    case REGISTER_USER_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        success: true,
        registrationError: null,

      };
      break;
    case REGISTER_USER_FAILED:
      state = {
        ...state,
        loading: false,
        registrationError: action.payload,
        error: true
      };
      break;
    case RESET_REGISTER_FLAG:
      state = {
        ...state,
        success: false,
        error: false
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Registration;

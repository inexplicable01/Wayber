import {PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG, SET_PROFILE} from "./actionTypes";

const initialState = {
  error: "",
  success: "",
  user: {
    email:'',
    confirm_password:'',
    first_name:'FIRSTNAME',
    last_name:'LASTNAME',
    age: 25,
    current_address:'123 main street, johnsville, WA 98104',
    phone_number: 9801234567,
    property_type: 'House',
    budget:500000,
    role: 'Buyer',
  }
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      state = { ...state };
      break;
    case PROFILE_SUCCESS:
      state = {
        ...state,
        success: action.payload.status,
        user: action.payload.data
      };
      break;
    case PROFILE_ERROR:
      state = {
        ...state,
        error: action.payload
      };
      break;
    case RESET_PROFILE_FLAG:
      state = {
        ...state,
        success: null
      };
      break;
    case SET_PROFILE:
      state = {
        ...state,
        user: {...state.user,
          ...action.payload},
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;

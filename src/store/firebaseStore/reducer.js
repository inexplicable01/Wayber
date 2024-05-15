// reducers.js
const initialState = {
  docToSign: null,
};

const firebaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DOC_TO_SIGN_SUCCESS':
      return { ...state, docToSign: action.payload };
    case 'RESET_DOC_TO_SIGN_SUCCESS':
      return { ...state, docToSign: null };
    default:
      return state;
  }
};

export default firebaseReducer;

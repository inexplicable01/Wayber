import { FETCH_QUOTES_SUCCESS } from './actionTypes';

const initialState = {
  quotes: []
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUOTES_SUCCESS:
      return { ...state, quotes: action.payload };
    default:
      return state;
  }
};

export default quoteReducer;

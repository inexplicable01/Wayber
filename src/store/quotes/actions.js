import * as actionTypes from './actionTypes';

export const fetchQuotesRequest = () => ({
    type: actionTypes.FETCH_QUOTES_REQUEST
});

export const fetchQuotesSuccess = quotes => ({
    type: actionTypes.FETCH_QUOTES_SUCCESS,
    payload: quotes
});

export const addQuoteRequest = (newQuote,userUID) => ({
    type: actionTypes.ADD_QUOTE_REQUEST,
    payload: { newQuote: newQuote, uid: userUID }
});


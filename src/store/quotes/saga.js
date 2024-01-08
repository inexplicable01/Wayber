import { call, put, takeLatest } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
// import firebase from "firebase/app";
// import "firebase/firestore";

import { getFirebaseBackend } from "../../helpers/firebase_helper";
function* fetchQuotesSaga() {
  try {
    const firebaseBackend = getFirebaseBackend();
    const quotes = yield call(firebaseBackend.fetchQuotes);
    yield put(actions.fetchQuotesSuccess(quotes));
  } catch (error) {
    // Handle error
  }
}

function* addQuoteSaga(action) {
  const { newQuote, uid} = action.payload;
  try {
    const firebaseBackend = getFirebaseBackend();
    yield call(firebaseBackend.addQuote, newQuote, uid);
    yield put(actions.fetchQuotesRequest());
  } catch (error) {
    console.log(error)
    // Handle error
  }
}

export default function* watchQuotesSaga() {
    yield takeLatest(actionTypes.FETCH_QUOTES_REQUEST, fetchQuotesSaga);
    yield takeLatest(actionTypes.ADD_QUOTE_REQUEST, addQuoteSaga);
}

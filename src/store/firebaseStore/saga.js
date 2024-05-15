// sagas.js
import { put, takeLatest } from 'redux-saga/effects';

function* handleSetDocToSign(action) {
  yield put({ type: 'SET_DOC_TO_SIGN_SUCCESS', payload: action.payload });
}

function* handleResetDocToSign() {
  yield put({ type: 'RESET_DOC_TO_SIGN_SUCCESS' });
}

export default function* watchFirebaseUser() {
  yield takeLatest('SET_DOC_TO_SIGN', handleSetDocToSign);
  yield takeLatest('RESET_DOC_TO_SIGN', handleResetDocToSign);
}



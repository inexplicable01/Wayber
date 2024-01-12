import { call, put, takeLatest , takeEvery} from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
// import firebase from "firebase/app";
// import "firebase/firestore";

import { getFirebaseBackend } from "../../helpers/firebase_helper";
function* uploadPdfSaga(action) {
  const {docid, pdfBlob , formName}= action.payload;
  const filepath = `${docid}/${formName}`;
       // const docID = `${uid}-${formName}`;
  try {
    const firebasebackend = getFirebaseBackend()
    const response = yield call(firebasebackend.uploadPdf, filepath, pdfBlob);
    console.log('uploadPdfSaga',response)
    // Handle success, maybe dispatch an action
  } catch (e) {
    // Handle error, maybe dispatch an action
  }
}

function* downloadPdfSaga(action) {
    const {docid, formName}= action.payload;
  const filepath = `${docid}/${formName}`;
  try {
    const firebasebackend = getFirebaseBackend()
    const url = yield call(firebasebackend.downloadPdf, filepath);
    // Handle success, you might want to open the URL in a new tab
    window.open(url, '_blank');
  } catch (e) {
    // Handle error, maybe dispatch an action
  }
}
export default function* watchPDFSaga() {
    yield takeEvery(actionTypes.UPLOAD_PDF_REQUEST, uploadPdfSaga);
  yield takeEvery(actionTypes.DOWNLOAD_PDF_SUCCESS, downloadPdfSaga);
}

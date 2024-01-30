import { call, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { getFirebaseBackend } from "../../helpers/firebase_helper";

function* handleClientProfileSubmission(action) {
  console.log(action);
  try {
    const firebaseBackend = getFirebaseBackend();
    const profileData = action.payload;
    const response = yield call(
      [firebaseBackend, firebaseBackend.submitClientProfile],
      profileData
    );

    yield put(actions.submitFormSuccess(response));
    console.log("Client profile submission successful", response);
  } catch (error) {
    console.error("Error in client profile submission:", error);
    yield put(actions.submitFormFailure(error.toString()));
  }
}

export default function* watchFormSubmission() {
  yield takeLatest(actionTypes.SUBMIT_FORM, handleClientProfileSubmission);
}

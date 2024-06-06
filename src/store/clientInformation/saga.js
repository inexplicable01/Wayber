import { call, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getFirebaseBackend } from "../../helpers/firebase_helper";


function* fetchInformationProfilesSaga() {
  try {
    const db = firebase.firestore();
    const querySnapshot = yield call(() =>
      db.collection("ClientInformation").get()
    );
    const profiles = [];
    querySnapshot.forEach((doc) => {
      profiles.push({ id: doc.id, ...doc.data() });
    });
    yield put(actions.fetchProfilesSuccess(profiles));
    console.log(profiles, "resplone ewjfbiejwbfj");
  } catch (error) {
    yield put(actions.fetchProfilesFailure(error.message));
  }
}

function* deleteClientInformationSaga(action) {
  try {
    const db = firebase.firestore();
    yield call(() => db.collection("ClientInformation").doc(action.payload).delete());

    yield put(actions.deleteClientInformationSuccess(action.payload));
    yield put(actions.fetchProfilesStart());
  } catch (error) {
    yield put(actions.deleteClientInformationFailure(error.message));
  }
}

function* editClientInformationSaga(action) {
  try {
    const db = firebase.firestore();
    const { clientId, updatedData } = action.payload;
    
    yield call(() => 
      db.collection("ClientInformation").doc(clientId).update(updatedData)
    );

    yield put(actions.editClientInformationSuccess());
    // Optionally, refresh the list of profiles after editing
    yield put(actions.fetchProfilesStart());
    // You can also dispatch success notifications or other actions here
  } catch (error) {
    yield put(actions.editClientInformationFailure(error.message));
    // Handle errors, e.g., by displaying notifications
  }
}

function* handleInformationSubmission(action) {
  console.log(action);
  try {
    const firebaseBackend = getFirebaseBackend();
    const clientData = action.payload;
    const response = yield call(
      [firebaseBackend, firebaseBackend.submitClientInformation],
      clientData
    );

    yield put(actions.submitInformationSuccess(response));
    console.log("Client information submission successful", response);
  } catch (error) {
    console.error("Error in client information submission:", error);
    yield put(actions.submitInformationFailure(error.toString()));
  }
}

export default function* watchClientInformation() {
  yield takeLatest(
    actionTypes.FETCH_CLIENT_INFORMATION_START,
    fetchInformationProfilesSaga
  );
  yield takeLatest(actionTypes.DELETE_CLIENT_INFORMATION_START,deleteClientInformationSaga);
  yield takeLatest(actionTypes.EDIT_CLIENT_INFORMATION_START, editClientInformationSaga);
  yield takeLatest(actionTypes.SUBMIT_INFORMATION, handleInformationSubmission)

}

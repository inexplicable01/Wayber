import { call, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { getFirebaseBackend } from "../../helpers/firebase_helper";
import axios from "axios";

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

function* fetchApiDataSaga() {
  // console.log("action callled>>>>>>>");
  try {
    const options = {
      method: "GET",
      url: "https://zillow56.p.rapidapi.com/search",
      params: { location: "houston, tx" },
      headers: {
        "X-RapidAPI-Key": "0f1a70c877msh63c2699008fda33p17811djsn4ef183cca70a",
        "X-RapidAPI-Host": "zillow56.p.rapidapi.com",
      },
    };
    const response = yield call(axios.request, options);
    //console.log(response);
    yield put(actions.fetchApiDataSuccess(response.results));
  } catch (error) {
    console.error("Error in API data fetch::::::::::::", error);
    yield put(actions.fetchApiDataFailure(error.toString()));
  }
}
function* getUserDetailsWithZpid(action) {
  console.log("action called>>>>getUserDetailsWithZpid>>>", action);
  const zpid = action.payload;
  console.log("zidid", zpid);
  try {
    yield put(actions.fetchApiDataRequest());
    const options = {
      method: "GET",
      url: "https://zillow56.p.rapidapi.com/property",
      params: { zpid: zpid },
      headers: {
        "X-RapidAPI-Key": "0f1a70c877msh63c2699008fda33p17811djsn4ef183cca70a",
        "X-RapidAPI-Host": "zillow56.p.rapidapi.com",
      },
    };
    const response = yield call(axios.request, options);
    console.log(response, "from the ZPID");

    yield put(actions.getUsersAddressSuccess(response));
  } catch (error) {
    console.error("Error in API data fetch", error);
    yield put(actions.getUsersAddressFailure(error.toString()));
  }
}

export default function* watchFormSubmission() {
  yield takeLatest(actionTypes.SUBMIT_FORM, handleClientProfileSubmission);
  yield takeLatest(actionTypes.FETCH_API_DATA_REQUEST, fetchApiDataSaga);
  yield takeLatest(
    actionTypes.GET_USER_DETAILS_REQUEST,
    getUserDetailsWithZpid
  );
}

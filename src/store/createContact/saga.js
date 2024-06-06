import { call, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function* handleUploadText(action) {
  try {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const response = yield call(
      axios.post,
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: action.payload }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    ); 

    yield put(actions.uploadTextSuccess(response.choices[0].message.content));
  } catch (error) {
    console.error("Error in GPT text upload:", error);
    yield put(actions.uploadTextFailure(error.toString()));
  }
}

function* fetchClientProfilesSaga() {
  try {
    const db = firebase.firestore();
    const querySnapshot = yield call(() => db.collection("ClientProfile").get());
    const profiles = [];
    querySnapshot.forEach(doc => {
      profiles.push({ id: doc.id, ...doc.data() });
    });
    yield put(actions.fetchProfilesSuccess(profiles));
  } catch (error) {
    yield put(actions.fetchProfilesFailure(error.message));
  }
}

function* getVendorDetails() {
  try {
    const db = firebase.firestore();
    const querySnapshot = yield call(() => db.collection("Vendors").get());
    const profiles = [];
    querySnapshot.forEach(doc => {
      profiles.push({ id: doc.id, ...doc.data() });
    });
    yield put(actions.getVendorProfileSuccess(profiles));
  } catch (error) {
    yield put(actions.getVendorProfileFailure(error.message));
  }
}

function* fetchApiDataSaga() {
  try {
    const options = {
      method: "GET",
      url: "https://zillow56.p.rapidapi.com/search",
      params: { location: "Seattle, WA" },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_ZILLOWKEY,
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
  //console.log("action called>>>>getUserDetailsWithZpid>>>", action);
  const zpid = action.payload;
  console.log("zidid", zpid);
  try {
    yield put(actions.fetchApiDataRequest());
    const options = {
      method: "GET",
      url: "https://zillow56.p.rapidapi.com/property",
      params: { zpid: zpid },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_ZILLOWKEY,
        "X-RapidAPI-Host": "zillow56.p.rapidapi.com",
      },
    };
    const response = yield call(axios.request, options);
    //console.log(response, "from the ZPID");

    yield put(actions.getUsersAddressSuccess(response));
  } catch (error) {
    console.error("Error in API data fetch", error);
    yield put(actions.getUsersAddressFailure(error.toString()));
  }
}

export default function* watchFormSubmission() {
  yield takeLatest(actionTypes.UPLOAD_TEXT_REQUEST, handleUploadText);
  yield takeLatest(actionTypes.FETCH_PROFILES_START,fetchClientProfilesSaga)
  yield takeLatest(actionTypes.FETCH_API_DATA_REQUEST, fetchApiDataSaga);
  yield takeLatest(
    actionTypes.GET_USER_DETAILS_REQUEST,
    getUserDetailsWithZpid
  );
  yield takeLatest(actionTypes.FETCH_VENDORPROFILES_REQUEST, getVendorDetails)
}

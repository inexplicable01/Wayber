import { call, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function* handleUploadText(action) {
  console.log(action, "act::::::::::::ion");
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


export default function* watchFormSubmission() {
  yield takeLatest(actionTypes.UPLOAD_TEXT_REQUEST, handleUploadText);
  yield takeLatest(actionTypes.FETCH_PROFILES_START,fetchClientProfilesSaga)
}

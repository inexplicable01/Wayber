import { call, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import axios from "axios";

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
    console.log("Dispatching success action with payload:", response.choices[0].message.content);

    // If the API call is successful, dispatch the success action with the response data
    yield put(
      actions.uploadTextSuccess(response.choices[0].message.content)
    );
  } catch (error) {
    // If the API call fails, dispatch the failure action with the error message
    console.error("Error in GPT text upload:", error);
    yield put(actions.uploadTextFailure(error.toString()));
  }
}

export default function* watchFormSubmission() {
  console.log('Dispatching UPLOAD_TEXT_REQUEST');

  yield takeLatest(actionTypes.UPLOAD_TEXT_REQUEST, handleUploadText);
}

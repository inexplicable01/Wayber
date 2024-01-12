import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper";
import {setProfile} from "../profile/actions";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      console.log('saga reached')
      const { email, password, ...additionalInfo } = user;

      //This register both creates the auth account and the document at the same time
      //Probably safer to break them into two.
      //Ignore for now.
      const response = yield call(
        fireBaseBackend.registerUser,
        email,
        password,
          additionalInfo
      );

      yield put(setProfile({...additionalInfo, email: email, uid:response.uid}));
      yield put(registerUserSuccessful());
    }

    // else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
    //   const response = yield call(postJwtRegister, "/post-jwt-register", user);
    //   yield put(registerUserSuccessful(response));
    // } else if (process.env.REACT_APP_API_URL) {
    //   const response = yield call(postFakeRegister, user);
    //   if (response.message === "success") {
    //     yield put(registerUserSuccessful(response));
    //   } else {
    //     yield put(registerUserFailed(response));
    //   }
    // }
  } catch (error) {
    yield put(registerUserFailed(error));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* registerSaga() {
  yield all([fork(watchUserRegister)]);
}

export default registerSaga;

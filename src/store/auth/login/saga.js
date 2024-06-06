import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import { setProfile, resetProfileFlag } from "../profile/actions";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";
import { getFirebaseBackend } from "../../../helpers/firebase_helper";


function* loginUser({ payload: { usersignininfo } }) {
  const firebaseBackend = getFirebaseBackend();
  try {

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      // console.log('okay')
      const response = yield call(
        firebaseBackend.loginUser,
        usersignininfo.email,
        usersignininfo.password
      );

      if (response) {
        console.log(response.uid + "got to here.")
        const userProfile = yield call(firebaseBackend.getUserProfile, response.uid)
        console.log("userProfile",userProfile)
        console.log('email',usersignininfo.email)
        console.log(response.uid + "uid.")
        yield put(setProfile({...userProfile,email : usersignininfo.email, uid:response.uid}));

        console.log('some')
        yield put(loginSuccess(response));
      } else {
        // console.log('caughterror?')
        yield put(apiError(response));
      }
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        email: usersignininfo.email,
        password: usersignininfo.password,
      });
      console.log('Sethere1')
      sessionStorage.setItem("authUser", JSON.stringify(response));
      if (response) {
        yield put(loginSuccess(response));
      } else {
        yield put(apiError(response));
      }
    } else if (process.env.REACT_APP_API_URL) {
      const response = yield call(postFakeLogin, {
        email: usersignininfo.email,
        password: usersignininfo.password,
      });
      if (response.status === "success") {
        yield put(loginSuccess(response));
        // history('/dashboard')

     console.log('Sethere2')
        sessionStorage.setItem("authUser", JSON.stringify(response));
      } else {
        yield put(apiError(response));
      }
    }
  } catch (error) {
    console.log('went past yield')
    console.log(error)

    yield put(apiError(error));
  }
}

function* logoutUser() {
  const firebaseBackend = getFirebaseBackend();

  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(firebaseBackend.logout);
      yield put(resetProfileFlag());
      yield put(logoutUserSuccess(LOGOUT_USER, response));
    } else {
      yield put(logoutUserSuccess(LOGOUT_USER, true));
    }
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  const firebaseBackend = getFirebaseBackend();

  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        firebaseBackend.socialLoginUser,
        data,
        type,
      );
      console.log('Sethere3')
      sessionStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else {
      const response = yield call(postSocialLogin, data);
      console.log('Sethere4')
      sessionStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history('/dashboard')
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;

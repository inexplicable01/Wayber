import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import registerSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";

// //quotes
import watchQuotesSaga from "./quotes/saga";

//API Key
import APIKeysaga from "./apikey/saga";
import watchPDFSaga from "./PDFs/saga";
import watchProjectGroupSaga from "./projectgroup/saga";
import watchFormSubmission from "./clientProfile/saga";
import watchUploadText from './createContact/saga';
import watchClientInformation from "./clientInformation/saga";
import  watchFirebaseUser  from "./firebaseStore/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(registerSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(watchQuotesSaga),
    fork(watchPDFSaga),
    fork(watchProjectGroupSaga),
    fork(APIKeysaga),
    fork(watchFormSubmission),
    fork(watchUploadText),
    fork(watchClientInformation),
    fork(watchFirebaseUser)
  ]);
}

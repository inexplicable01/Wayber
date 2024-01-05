import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import registerSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";

// //calendar
// import calendarSaga from "./BackUp/calendar/saga";
// //chat
// import chatSaga from "./BackUp/chat/saga";
// //ecommerce
// import ecommerceSaga from "./BackUp/ecommerce/saga";

// //Project
// import projectSaga from "./BackUp/projects/saga";
// // Task
// import taskSaga from "./BackUp/tasks/saga";
// // Crypto
// import cryptoSaga from "./BackUp/crypto/saga";
// //TicketsList
// import ticketsSaga from "./BackUp/tickets/saga";

// //crm
// import crmSaga from "./BackUp/crm/saga";
// //invoice
// import invoiceSaga from "./BackUp/invoice/saga";
// //mailbox
// import mailboxSaga from "./BackUp/mailbox/saga";
//
// // Dashboard Analytics
// import dashboardAnalyticsSaga from "./BackUp/dashboardAnalytics/saga";
//
// // Dashboard CRM
// import dashboardCrmSaga from "./BackUp/dashboardCRM/saga";
//
// // Dashboard Ecommerce
// import dashboardEcommerceSaga from "./BackUp/dashboardEcommerce/saga";
//
// // Dashboard Crypto
// import dashboardCryptoSaga from "./BackUp/dashboardCrypto/saga";
//
// // Dashboard Project
// import dashboardProjectSaga from "./BackUp/dashboardProject/saga";
//
// // Dashboard NFT
// import dashboardNFTSaga from "./BackUp/dashboardNFT/saga";
//
// // Pages > Team
// import teamSaga from "./BackUp/team/saga";

// File Manager
import fileManager from "./fileManager/saga";

// // To do
// import todos from "./BackUp/todos/saga"
//
// //Job
// import jobSaga from "./BackUp/job/saga";

//API Key
import APIKeysaga from "./apikey/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(registerSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    // fork(chatSaga),
    // fork(projectSaga),
    // fork(taskSaga),
    // fork(cryptoSaga),
    // fork(ticketsSaga),
    // fork(calendarSaga),
    // fork(ecommerceSaga),
    // fork(crmSaga),
    // fork(invoiceSaga),
    // fork(mailboxSaga),
    // fork(dashboardAnalyticsSaga),
    // fork(dashboardCrmSaga),
    // fork(dashboardEcommerceSaga),
    // fork(dashboardCryptoSaga),
    // fork(dashboardProjectSaga),
    // fork(dashboardNFTSaga),
    // fork(teamSaga),
    fork(fileManager),
    // fork(todos),
    // fork(jobSaga),
    fork(APIKeysaga)
  ]);
}

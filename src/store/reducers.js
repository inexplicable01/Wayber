import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Registration from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//Calendar
// import Calendar from "./BackUp/calendar/reducer";
//Chat
// import chat from "./BackUp/chat/reducer";
//Ecommerce
// import Ecommerce from "./BackUp/ecommerce/reducer";

//Project
// import Projects from "./BackUp/projects/reducer";

// Tasks
// import Tasks from "./BackUp/tasks/reducer";
//Form advanced
// import changeNumber from "./BackUp/formAdvanced/reducer";

//Crypto
// import Crypto from "./BackUp/crypto/reducer";

//TicketsList
// import Tickets from "./BackUp/tickets/reducer";
//Crm
// import Crm from "./BackUp/crm/reducer";

//Invoice
// import Invoice from "./BackUp/invoice/reducer";

//Mailbox
// import Mailbox from "./BackUp/mai/lbox/reducer";

// Dashboard Analytics
// import DashboardAnalytics from "./BackU/p/dashboardAnalytics/reducer";

// Dashboard CRM
// import DashboardCRM from "./BackUp/dashboardCRM/reducer";

// Dashboard Ecommerce
// import DashboardEcommerce from "./BackUp/dashboardEcommerce/reducer";

// Dashboard Cryto
// import DashboardCrypto from "./BackUp/dashboardCrypto/reducer";

// Dashboard Cryto
// import DashboardProject from "./BackUp/dashboardProject/reducer";

// Dashboard NFT
// import DashboardNFT from "./BackUp/dashboardNFT/reducer";

// Pages > Team
// import Team from "./BackUp/team/reducer";

// File Manager
import FileManager from "./fileManager/reducer"

// To do
// import Todos from "./BackUp/todos/reducer"

// Job
// import Jobs from './BackUp/job/reducer'

//API Key
import APIKey from "./apikey/reducer";

const rootReducer = combineReducers({
    // public
    Layout,
    Login,
    Registration,
    ForgetPassword,
    Profile,
    // Calendar,
    // chat,
    // Projects,
    // Ecommerce,
    // Tasks,
    // changeNumber,
    // Crypto,
    // Tickets,
    // Crm,
    // Invoice,
    // Mailbox,
    // DashboardAnalytics,
    // DashboardCRM,
    // DashboardEcommerce,
    // DashboardCrypto,
    // DashboardProject,
    // DashboardNFT,
    // Team,
    FileManager,
    // Todos,
    // Jobs,
    APIKey
});

export default rootReducer;
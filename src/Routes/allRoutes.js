import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
// import DashboardAnalytics from "../pages/Template/DashboardAnalytics";
// import DashboardCrm from "../pages/Template/DashboardCrm";
import DashboardMain from "../pages/DashboardMain";
// import DashboardJobs from '../pages/Template/DashboardJob'



//AuthenticationInner pages
import BasicSignIn from '../pages/Template/AuthenticationInner/Login/BasicSignIn';
import CoverSignIn from '../pages/Template/AuthenticationInner/Login/CoverSignIn';
import BasicSignUp from '../pages/Template/AuthenticationInner/Register/BasicSignUp';
import CoverSignUp from "../pages/Template/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from '../pages/Template/AuthenticationInner/PasswordReset/BasicPasswReset';

//pages
// import Starter from '../pages/Template/Pages/Starter/Starter';
// import SimplePage from '../pages/Template/Pages/Profile/SimplePage/SimplePage';
// import Settings from '../pages/Template/Pages/Profile/Settings/Settings';
// import Team from '../pages/Template/Pages/Team/Team';
// import Timeline from '../pages/Template/Pages/Timeline/Timeline';
// import Faqs from '../pages/Template/Pages/Faqs/Faqs';
// import Pricing from '../pages/Template/Pages/Pricing/Pricing';
// import Gallery from '../pages/Template/Pages/Gallery/Gallery';
// import Maintenance from '../pages/Template/Pages/Maintenance/Maintenance';
// import ComingSoon from '../pages/Template/Pages/ComingSoon/ComingSoon';
// import SiteMap from '../pages/Template/Pages/SiteMap/SiteMap';
// import SearchResults from '../pages/Template/Pages/SearchResults/SearchResults';
// import PrivecyPolicy from '../pages/Template/Pages/PrivacyPolicy.js'
// import TermsCondition from '../pages/Template/Pages/TermsCondition'

import CoverPasswReset from '../pages/Template/AuthenticationInner/PasswordReset/CoverPasswReset';
import BasicLockScreen from '../pages/Template/AuthenticationInner/LockScreen/BasicLockScr';
import CoverLockScreen from '../pages/Template/AuthenticationInner/LockScreen/CoverLockScr';
import BasicLogout from '../pages/Template/AuthenticationInner/Logout/BasicLogout';
import CoverLogout from '../pages/Template/AuthenticationInner/Logout/CoverLogout';
import BasicSuccessMsg from '../pages/Template/AuthenticationInner/SuccessMessage/BasicSuccessMsg';
import CoverSuccessMsg from '../pages/Template/AuthenticationInner/SuccessMessage/CoverSuccessMsg';
import BasicTwosVerify from '../pages/Template/AuthenticationInner/TwoStepVerification/BasicTwosVerify';
import CoverTwosVerify from '../pages/Template/AuthenticationInner/TwoStepVerification/CoverTwosVerify';
import Basic404 from '../pages/Template/AuthenticationInner/Errors/Basic404';
import Cover404 from '../pages/Template/AuthenticationInner/Errors/Cover404';
import Alt404 from '../pages/Template/AuthenticationInner/Errors/Alt404';
import Error500 from '../pages/Template/AuthenticationInner/Errors/Error500';

import BasicPasswCreate from "../pages/Template/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "../pages/Template/AuthenticationInner/PasswordCreate/CoverPasswCreate";
import Offlinepage from "../pages/Template/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

//PDF Edits
import Form21A from "../pages/PDF/Form21A"

//Job pages
// import Statistics from "../pages/Template/Jobs/Statistics";
// import JobList from "../pages/Template/Jobs/JobList/List";
// import JobGrid from "../pages/Template/Jobs/JobList/Grid";
// import JobOverview from "../pages/Template/Jobs/JobList/Overview";
// import CandidateList from "../pages/Template/Jobs/CandidateList/ListView";
// import CandidateGrid from "../pages/Template/Jobs/CandidateList/GridView";
// import NewJobs from "../pages/Template/Jobs/NewJob";
// import JobCategories from "../pages/Template/Jobs/JobCategories";
// import Application from "../pages/Template/Jobs/Application";
// import CompaniesList from "../pages/Template/Jobs/CompaniesList";

import ApiKey from '../pages/APIKey/index'

// Landing Index
import OnePage from "../pages/Landing/OnePage";
// import NFTLanding from "../pages/Landing/NFTLanding";
import Dorsin from "../pages/Landing/Dorsin"
import PDFViewerComponent from "../pages/PDF/PDFViewer.js"
import PDFViewerComponent2 from "../pages/PDF/PDFViewer2.js"

// import JobLanding from '../pages/Landing/Job'

// User Profile
import UserProfile from "../pages/Authentication/user-profile";
//
import ProjectGroupsComponent from "../pages/ProjectGroups/ProjectGroup";
import CreateGroup from "../pages/ProjectGroups/CreateGroup";
import ProjectDetails from "../pages/ProjectGroups/ProjectDetails"

// Client Profile
import CreateClientProfile from "../pages/clientProfile/index.js";
// create Contract
import CreateContact from '../pages/createContact/index.js'
const authProtectedRoutes = [
  // { path: "/dashboard-analytics", component: <DashboardAnalytics /> },
  // { path: "/dashboard-crm", component: <DashboardCrm /> },
  { path: "/dashboard", component: <ProjectGroupsComponent /> },
  { path: "/index", component: <ProjectGroupsComponent /> },

{ path: "/pdfviewer", component: <PDFViewerComponent /> },
    { path: "/form21a", component: <Form21A /> },


    //ProjectGroups
{ path: "/project_group", component: <ProjectGroupsComponent /> },
    { path: "/create-group", component: <CreateGroup /> },
    { path: "/project_details/:projectGroupID", component: <ProjectDetails /> },
    { path: "/project_details/:projectGroupID/form/:form", component: <PDFViewerComponent2 /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },
 //create-client-profile
 { path: "/create_client_profile", component: <CreateClientProfile /> },
 { path: "/create_contact", component: <CreateContact /> },
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name

  { path: "*", component: <Navigate to="/dashboard" /> },



  //APIkey
  { path: "/apps-api-key", component: <ApiKey /> },

];

const publicRoutes = [
  // Authentication Page
  {
    path: "/",
    exact: true,
    component: <Navigate to="/landing" />,
  },
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  { path: "/auth-signup-cover", component: <CoverSignUp /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
  // { path: "/pages-maintenance", component: <Maintenance /> },
  // { path: "/pages-coming-soon", component: <ComingSoon /> },

  { path: "/landing", component: <Dorsin /> },
  // { path: "/landingtest", component: <Dorsin /> },
  // { path: "/nft-landing", component: <NFTLanding /> },
  // { path: "/job-landing", component: <OnePage /> },

  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> },

];

export { authProtectedRoutes, publicRoutes };

  // //Chat
  // { path: "/apps-chat", component: <Chat /> },
  // { path: "/apps-chatwindow", component: <ChatWindow /> },
  //
  //
  //
  // //Task
  // { path: "/apps-tasks-list-view", component: <TaskList /> },
  // { path: "/apps-tasks-details", component: <TaskDetails /> },
  //
  //
  //
  // //Supports Tickets
  // { path: "/apps-tickets-list", component: <ListView /> },
  // { path: "/apps-tickets-details", component: <TicketsDetails /> },
  //
  //
  //
  // // Widgets
  // { path: "/widgets", component: <Widgets /> },
  //
  //
  //
  // //Icons
  // { path: "/icons-remix", component: <RemixIcons /> },
  // { path: "/icons-boxicons", component: <BoxIcons /> },
  // { path: "/icons-materialdesign", component: <MaterialDesign /> },
  // { path: "/icons-feather", component: <FeatherIcons /> },
  // { path: "/icons-lineawesome", component: <LineAwesomeIcons /> },
  // { path: "/icons-crypto", component: <CryptoIcons /> },
  //
  // //Maps
  // // { path: "/maps-google", component: <GoogleMaps /> },
  // { path: "/maps-vector", component: <VectorMaps /> },
  // { path: "/maps-leaflet", component: <LeafletMaps /> },
  //
  // //Pages
  // { path: "/pages-starter", component: <ListingPage /> },
  // { path: "/pages-profile", component: <SimplePage /> },
  // { path: "/pages-profile-settings", component: <Settings /> },
  // { path: "/pages-team", component: <Team /> },
  // { path: "/pages-timeline", component: <Timeline /> },
  // { path: "/pages-faqs", component: <Faqs /> },
  // { path: "/pages-gallery", component: <Gallery /> },
  // { path: "/pages-pricing", component: <Pricing /> },
  // { path: "/pages-sitemap", component: <SiteMap /> },
  // { path: "/pages-search-results", component: <SearchResults /> },
  // { path: "/pages-privecy-policy", component: <PrivecyPolicy /> },
  // { path: "/pages-terms-condition", component: <TermsCondition /> },
  // //Job pages
  // { path: "/apps-job-statistics", component: <Statistics /> },
  // { path: "/apps-job-lists", component: <JobList /> },
  // { path: "/apps-job-grid-lists", component: <JobGrid /> },
  // { path: "/apps-job-details", component: <JobOverview /> },
  // { path: "/apps-job-candidate-lists", component: <CandidateList /> },
  // { path: "/apps-job-candidate-grid", component: <CandidateGrid /> },
  // { path: "/apps-job-application", component: <Application /> },
  // { path: "/apps-job-new", component: <NewJobs /> },
  // { path: "/apps-job-companies-lists", component: <CompaniesList /> },
  // { path: "/apps-job-categories", component: <JobCategories /> },


// import DashboardCrypto from "../pages/Template/DashboardCrypto";
// import DashboardProject from "../pages/Template/DashboardProject";
//
// import ListingPage from "../pages/Template/Maps/ListingPage"
// import DashboardNFT from "../pages/DashboardNFT";


//Chat
// import Chat from "../pages/Template/Chat";
//
// //Task
// import TaskDetails from "../pages/Template/Tasks/TaskDetails";
// import TaskList from "../pages/Template/Tasks/TaskList";
//
//
// // Support Tickets
// import ListView from '../pages/Template/SupportTickets/ListView';
// import TicketsDetails from '../pages/Template/SupportTickets/TicketsDetails';
//
//
// // Widgets
// import Widgets from '../pages/Template/Widgets/Index';


//Icon pages
// import RemixIcons from "../pages/Template/Icons/RemixIcons/RemixIcons";
// import BoxIcons from "../pages/Template/Icons/BoxIcons/BoxIcons";
// import MaterialDesign from "../pages/Template/Icons/MaterialDesign/MaterialDesign";
// import FeatherIcons from "../pages/Template/Icons/FeatherIcons/FeatherIcons";
// import LineAwesomeIcons from "../pages/Template/Icons/LineAwesomeIcons/LineAwesomeIcons";
// import CryptoIcons from "../pages/Template/Icons/CryptoIcons/CryptoIcons";
//
// //Maps
// // import GoogleMaps from "../pages/Maps/GoogleMaps/GoogleMaps";
// import VectorMaps from "../pages/Template/Maps/VectorMaps/VectorMaps";
// import LeafletMaps from "../pages/Template/Maps/LeafletMaps/LeafletMaps";
//Charts
// import LineCharts from "../pages/Charts/ApexCharts/LineCharts";
// import AreaCharts from "../pages/Charts/ApexCharts/AreaCharts";
// import ColumnCharts from "../pages/Charts/ApexCharts/ColumnCharts";
// import BarCharts from "../pages/Charts/ApexCharts/BarCharts";
// import MixedCharts from "../pages/Charts/ApexCharts/MixedCharts";
// import TimelineCharts from "../pages/Charts/ApexCharts/TimelineCharts";
// import CandlestickChart from "../pages/Charts/ApexCharts/CandlestickChart";
// import BoxplotCharts from "../pages/Charts/ApexCharts/BoxplotCharts";
// import BubbleChart from "../pages/Charts/ApexCharts/BubbleChart";
// import ScatterCharts from "../pages/Charts/ApexCharts/ScatterCharts";
// import HeatmapCharts from "../pages/Charts/ApexCharts/HeatmapCharts";
// import TreemapCharts from "../pages/Charts/ApexCharts/TreemapCharts";
// import PieCharts from "../pages/Charts/ApexCharts/PieCharts";
// import RadialbarCharts from "../pages/Charts/ApexCharts/RadialbarCharts";
// import RadarCharts from "../pages/Charts/ApexCharts/RadarCharts";
// import PolarCharts from "../pages/Charts/ApexCharts/PolarCharts";

// import ChartsJs from "../pages/Charts/ChartsJs/index";
// import Echarts from "../pages/Charts/ECharts/index";

//Forms
// import BasicElements from "../pages/Forms/BasicElements/BasicElements";
// import FormSelect from "../pages/Forms/FormSelect/FormSelect";
// import FormEditor from "../pages/Forms/FormEditor/FormEditor";
// import CheckBoxAndRadio from "../pages/Forms/CheckboxAndRadio/CheckBoxAndRadio";
// import Masks from "../pages/Forms/Masks/Masks";
// import FileUpload from "../pages/Forms/FileUpload/FileUpload";
// import FormPickers from "../pages/Forms/FormPickers/FormPickers";
// import FormRangeSlider from "../pages/Forms/FormRangeSlider/FormRangeSlider";
// import Formlayouts from "../pages/Forms/FormLayouts/Formlayouts";
// import FormValidation from "../pages/Forms/FormValidation/FormValidation";
// import FormWizard from "../pages/Forms/FormWizard/FormWizard";
// import FormAdvanced from "../pages/Forms/FormAdvanced/FormAdvanced";
// import Select2 from "../pages/Forms/Select2/Select2";
//
// //Tables
// import BasicTables from '../pages/Tables/BasicTables/BasicTables';
// import GridTables from '../pages/Tables/GridTables/GridTables';
// import ListTables from '../pages/Tables/ListTables/ListTables';
// import DataTables from "../pages/Tables/DataTables/DataTables";
// //Ecommerce Pages
// import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
// import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
// import EcommerceAddProduct from "../pages/Ecommerce/EcommerceProducts/EcommerceAddProduct";
// import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
// import EcommerceOrderDetail from "../pages/Ecommerce/EcommerceOrders/EcommerceOrderDetail";
// import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
// import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
// import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
// import EcommerceSellers from "../pages/Ecommerce/EcommerceSellers/index";
// import EcommerceSellerDetail from "../pages/Ecommerce/EcommerceSellers/EcommerceSellerDetail";

// NFT Marketplace Pages
// import Marketplace from "../pages/NFTMarketplace/Marketplace";
// import Collections from "../pages/NFTMarketplace/Collections";
// import CreateNFT from "../pages/NFTMarketplace/CreateNFT";
// import Creators from "../pages/NFTMarketplace/Creators";
// import ExploreNow from "../pages/NFTMarketplace/ExploreNow";
// import ItemDetails from "../pages/NFTMarketplace/Itemdetails";
// import LiveAuction from "../pages/NFTMarketplace/LiveAuction";
// import Ranking from "../pages/NFTMarketplace/Ranking";
// import WalletConnect from "../pages/NFTMarketplace/WalletConnect";
//
// // Base Ui
// import UiAlerts from "../pages/BaseUi/UiAlerts/UiAlerts";
// import UiBadges from "../pages/BaseUi/UiBadges/UiBadges";
// import UiButtons from "../pages/BaseUi/UiButtons/UiButtons";
// import UiColors from "../pages/BaseUi/UiColors/UiColors";
// import UiCards from "../pages/BaseUi/UiCards/UiCards";
// import UiCarousel from "../pages/BaseUi/UiCarousel/UiCarousel";
// import UiDropdowns from "../pages/BaseUi/UiDropdowns/UiDropdowns";
// import UiGrid from "../pages/BaseUi/UiGrid/UiGrid";
// import UiImages from "../pages/BaseUi/UiImages/UiImages";
// import UiTabs from "../pages/BaseUi/UiTabs/UiTabs";
// import UiAccordions from "../pages/BaseUi/UiAccordion&Collapse/UiAccordion&Collapse";
// import UiModals from "../pages/BaseUi/UiModals/UiModals";
// import UiOffcanvas from "../pages/BaseUi/UiOffcanvas/UiOffcanvas";
// import UiPlaceholders from "../pages/BaseUi/UiPlaceholders/UiPlaceholders";
// import UiProgress from "../pages/BaseUi/UiProgress/UiProgress";
// import UiNotifications from "../pages/BaseUi/UiNotifications/UiNotifications";
// import UiMediaobject from "../pages/BaseUi/UiMediaobject/UiMediaobject";
// import UiEmbedVideo from "../pages/BaseUi/UiEmbedVideo/UiEmbedVideo";
// import UiTypography from "../pages/BaseUi/UiTypography/UiTypography";
// import UiList from "../pages/BaseUi/UiLists/UiLists";
// import UiGeneral from "../pages/BaseUi/UiGeneral/UiGeneral";
// import UiRibbons from "../pages/BaseUi/UiRibbons/UiRibbons";
// import UiUtilities from "../pages/BaseUi/UiUtilities/UiUtilities";
//
// // Advance Ui
// import UiNestableList from "../pages/AdvanceUi/UiNestableList/UiNestableList";
// import UiScrollbar from "../pages/AdvanceUi/UiScrollbar/UiScrollbar";
// import UiAnimation from "../pages/AdvanceUi/UiAnimation/UiAnimation";
// import UiTour from "../pages/AdvanceUi/UiTour/UiTour";
// import UiSwiperSlider from "../pages/AdvanceUi/UiSwiperSlider/UiSwiperSlider";
// import UiRatings from "../pages/AdvanceUi/UiRatings/UiRatings";
// import UiHighlight from "../pages/AdvanceUi/UiHighlight/UiHighlight";
// //Transactions
// import Transactions from '../pages/Crypto/Transactions';
// import BuySell from '../pages/Crypto/BuySell';
// import CryproOrder from '../pages/Crypto/CryptoOrder';
// import MyWallet from '../pages/Crypto/MyWallet';
// import ICOList from '../pages/Crypto/ICOList';
// import KYCVerification from '../pages/Crypto/KYCVerification';

//Crm Pages
// import CrmCompanies from "../pages/Crm/CrmCompanies";
// import CrmContacts from "../pages/Crm/CrmContacts";
// import CrmDeals from "../pages/Crm/CrmDeals/index";
// import CrmLeads from "../pages/Crm/CrmLeads/index";

//Invoices
// import InvoiceList from "../pages/Invoices/InvoiceList";
// import InvoiceCreate from "../pages/Invoices/InvoiceCreate";
// import InvoiceDetails from "../pages/Invoices/InvoiceDetails";
// import ChatWindow from "../pages/ChatBot/ChatWindow"
// import Calendar from "../pages/Calendar";

// Project
// import ProjectList from "../pages/Projects/ProjectList";
// import ProjectOverview from "../pages/Projects/ProjectOverview";
// import CreateProject from "../pages/Projects/CreateProject";
//Calendar
// Email box
// import MailInbox from "../pages/EmailInbox";
// import BasicAction from "../pages/Email/EmailTemplates/BasicAction";
// import EcommerceAction from "../pages/Email/EmailTemplates/EcommerceAction";
  // Forms
  // { path: "/forms-elements", component: <BasicElements /> },
  // { path: "/forms-select", component: <FormSelect /> },
  // { path: "/forms-editors", component: <FormEditor /> },
  // { path: "/forms-checkboxes-radios", component: <CheckBoxAndRadio /> },
  // { path: "/forms-masks", component: <Masks /> },
  // { path: "/forms-file-uploads", component: <FileUpload /> },
  // { path: "/forms-pickers", component: <FormPickers /> },
  // { path: "/forms-range-sliders", component: <FormRangeSlider /> },
  // { path: "/forms-layouts", component: <Formlayouts /> },
  // { path: "/forms-validation", component: <FormValidation /> },
  // { path: "/forms-wizard", component: <FormWizard /> },
  // { path: "/forms-advanced", component: <FormAdvanced /> },
  // { path: "/forms-select2", component: <Select2 /> },

  //Tables
  // { path: "/tables-basic", component: <BasicTables /> },
  // { path: "/tables-gridjs", component: <GridTables /> },
  // { path: "/tables-listjs", component: <ListTables /> },
  // { path: "/tables-datatables", component: <DataTables /> },

  // { path: "/dashboard-crypto", component: <DashboardCrypto /> },
  // { path: "/dashboard-projects", component: <DashboardProject /> },
  // // { path: "/dashboard-nft", component: <DashboardNFT /> },
  // { path: "/dashboard-job", component: <DashboardJobs /> },
  // { path: "/apps-calendar", component: <Calendar /> },
  // { path: "/apps-ecommerce-products", component: <EcommerceProducts /> },
  // { path: "/apps-ecommerce-product-details", component: <EcommerceProductDetail /> },
  // { path: "/apps-ecommerce-add-product", component: <EcommerceAddProduct /> },
  // { path: "/apps-ecommerce-orders", component: <EcommerceOrders /> },
  // { path: "/apps-ecommerce-order-details", component: <EcommerceOrderDetail /> },
  // { path: "/apps-ecommerce-customers", component: <EcommerceCustomers /> },
  // { path: "/apps-ecommerce-cart", component: <EcommerceCart /> },
  // { path: "/apps-ecommerce-checkout", component: <EcommerceCheckout /> },
  // { path: "/apps-ecommerce-sellers", component: <EcommerceSellers /> },
  // { path: "/apps-ecommerce-seller-details", component: <EcommerceSellerDetail /> },

  // { path: "/apps-file-manager", component: <FileManager /> },
  // { path: "/apps-todo", component: <ToDoList /> },
  //EMail
  // { path: "/apps-mailbox", component: <MailInbox /> },
  // { path: "/apps-email-basic", component: <BasicAction /> },
  // { path: "/apps-email-ecommerce", component: <EcommerceAction /> },

  //Projects
  // { path: "/apps-projects-list", component: <ProjectList /> },
  // { path: "/apps-projects-overview", component: <ProjectOverview /> },
  // { path: "/apps-projects-create", component: <CreateProject /> },
  //Crm
  // { path: "/apps-crm-contacts", component: <CrmContacts /> },
  // { path: "/apps-crm-companies", component: <CrmCompanies /> },
  // { path: "/apps-crm-deals", component: <CrmDeals /> },
  // { path: "/apps-crm-leads", component: <CrmLeads /> },

  //Invoices
  // { path: "/apps-invoices-list", component: <InvoiceList /> },
  // { path: "/apps-invoices-details", component: <InvoiceDetails /> },
  // { path: "/apps-invoices-create", component: <InvoiceCreate /> },

      //transactions
  // { path: "/apps-crypto-transactions", component: <Transactions /> },
  // { path: "/apps-crypto-buy-sell", component: <BuySell /> },
  // { path: "/apps-crypto-orders", component: <CryproOrder /> },
  // { path: "/apps-crypto-wallet", component: <MyWallet /> },
  // { path: "/apps-crypto-ico", component: <ICOList /> },
  // { path: "/apps-crypto-kyc", component: <KYCVerification /> },

  // NFT Marketplace
  // { path: "/apps-nft-marketplace", component: <Marketplace /> },
  // { path: "/apps-nft-collections", component: <Collections /> },
  // { path: "/apps-nft-create", component: <CreateNFT /> },
  // { path: "/apps-nft-creators", component: <Creators /> },
  // { path: "/apps-nft-explore", component: <ExploreNow /> },
  // { path: "/apps-nft-item-details", component: <ItemDetails /> },
  // { path: "/apps-nft-auction", component: <LiveAuction /> },
  // { path: "/apps-nft-ranking", component: <Ranking /> },
  // { path: "/apps-nft-wallet", component: <WalletConnect /> },

  //charts
  // { path: "/charts-apex-line", component: <LineCharts /> },
  // { path: "/charts-apex-area", component: <AreaCharts /> },
  // { path: "/charts-apex-column", component: <ColumnCharts /> },
  // { path: "/charts-apex-bar", component: <BarCharts /> },
  // { path: "/charts-apex-mixed", component: <MixedCharts /> },
  // { path: "/charts-apex-timeline", component: <TimelineCharts /> },
  // { path: "/charts-apex-candlestick", component: <CandlestickChart /> },
  // { path: "/charts-apex-boxplot", component: <BoxplotCharts /> },
  // { path: "/charts-apex-bubble", component: <BubbleChart /> },
  // { path: "/charts-apex-scatter", component: <ScatterCharts /> },
  // { path: "/charts-apex-heatmap", component: <HeatmapCharts /> },
  // { path: "/charts-apex-treemap", component: <TreemapCharts /> },
  // { path: "/charts-apex-pie", component: <PieCharts /> },
  // { path: "/charts-apex-radialbar", component: <RadialbarCharts /> },
  // { path: "/charts-apex-radar", component: <RadarCharts /> },
  // { path: "/charts-apex-polar", component: <PolarCharts /> },
  //
  // { path: "/charts-chartjs", component: <ChartsJs /> },
  // { path: "/charts-echarts", component: <Echarts /> },


  // Base Ui
  // { path: "/ui-alerts", component: <UiAlerts /> },
  // { path: "/ui-badges", component: <UiBadges /> },
  // { path: "/ui-buttons", component: <UiButtons /> },
  // { path: "/ui-colors", component: <UiColors /> },
  // { path: "/ui-cards", component: <UiCards /> },
  // { path: "/ui-carousel", component: <UiCarousel /> },
  // { path: "/ui-dropdowns", component: <UiDropdowns /> },
  // { path: "/ui-grid", component: <UiGrid /> },
  // { path: "/ui-images", component: <UiImages /> },
  // { path: "/ui-tabs", component: <UiTabs /> },
  // { path: "/ui-accordions", component: <UiAccordions /> },
  // { path: "/ui-modals", component: <UiModals /> },
  // { path: "/ui-offcanvas", component: <UiOffcanvas /> },
  // { path: "/ui-placeholders", component: <UiPlaceholders /> },
  // { path: "/ui-progress", component: <UiProgress /> },
  // { path: "/ui-notifications", component: <UiNotifications /> },
  // { path: "/ui-media", component: <UiMediaobject /> },
  // { path: "/ui-embed-video", component: <UiEmbedVideo /> },
  // { path: "/ui-typography", component: <UiTypography /> },
  // { path: "/ui-lists", component: <UiList /> },
  // { path: "/ui-general", component: <UiGeneral /> },
  // { path: "/ui-ribbons", component: <UiRibbons /> },
  // { path: "/ui-utilities", component: <UiUtilities /> },

  // Advance Ui
  // { path: "/advance-ui-nestable", component: <UiNestableList /> },
  // { path: "/advance-ui-scrollbar", component: <UiScrollbar /> },
  // { path: "/advance-ui-animation", component: <UiAnimation /> },
  // { path: "/advance-ui-tour", component: <UiTour /> },
  // { path: "/advance-ui-swiper", component: <UiSwiperSlider /> },
  // { path: "/advance-ui-ratings", component: <UiRatings /> },
  // { path: "/advance-ui-highlight", component: <UiHighlight /> },
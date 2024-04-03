import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Col, Row, FormFeedback } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import {
  setUserDetails,
  fetchProfilesStart,
  getVendorProfileRequest,
} from "../../store/createContact/actions";
import Styles from "../../../src/assets/scss/pages/_createClient.scss";
import {
  fetchApiDataRequest,
  getUsersAddressRequest,
} from "../../store/createContact/actions";
import { Stepper } from "react-form-stepper";
import StepOneForm from "./StepOneForm";
import FinancialContingencyForm from "./FinancialContingencyForm";
import InspectionContingencyForm from "./InspectionContingencyForm";
import { useNavigate } from "react-router-dom";

const CreateContactForm = ({ onSubmit }) => {
  const dispatch = useDispatch();

  const [clientProfiles, setClientProfiles] = useState([]);
  const [displayPDF, setDisplayPDF] = useState(false);
  const [address, setAddress] = useState();
  const [zpidDeatils, setZpidDetails] = useState();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const navigate = useNavigate();

  const useStepFieldValidator = (formik, currentStep) => {
    const getCurrentStepFields = (step) => {
      switch (step) {
        case 1:
          return [
            "address",
            "buyer",
            "seller",
            "price",
            "closingDate",
            "titleInsuranceCompany",
            "closingAgent",
          ];
        case 2:
          return [
            "financialContingency",
            "loanType",
            "downPayment",
            "loanCostProvisions",
            // "applicationKickStart",
          ];
        case 3:
          return [
            "inspectionContingency",
            "buyersNotice",
            "includeSewerInspection",
            "additionalTimeForInspections",
            "sellersResponseTime",
            "buyersReplyTime",
            "repairCompletionDate",
            "neighborhoodReviewContingency",
            "neighborhoodReviewDays",
          ];
        default:
          return [];
      }
    };

    const fieldsToValidate = getCurrentStepFields(currentStep);

    const areFieldsValid = fieldsToValidate.every((field) => {
      const value = formik.values[field];
      return value !== undefined && value !== "";
    });

    return areFieldsValid;
  };

  const nextStep = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevState) => prevState - 1);
    }
  };

  const userDetailsData = useSelector((state) => state.textUploadReducer);

  const formik = useFormik({
    initialValues: {
      address: "",
      buyer: "",
      seller: "",
      price: "",
      closingDate: "",
      titleInsuranceCompany: "",
      closingAgent: "",
      loanType: "",
      loanTypeOtherText: "",
      downPayment: "",
      loanCostProvisions: "",
      financialContingency: false,
      applicationKickStart: "5",
      buyersNotice: "10",
      inspectionContingency: false,
      includeSewerInspection: true,
      additionalTimeForInspections: "5",
      sellersResponseTime: "3",
      buyersReplyTime: "3",
      repairCompletionDate: "3",
      neighborhoodReviewContingency: false,
      neighborhoodReviewDays: "",
    },

    validationSchema: Yup.object({
      address: Yup.string().required("Please select an address"),
      buyer: Yup.string().required("Please select a buyer"),
      seller: Yup.string().required("Please select a seller"),
      price: Yup.number().required("Please enter a price"),
      closingDate: Yup.date().required("Please select an end date"),
      titleInsuranceCompany: Yup.string().required(
        "Please enter the title insurance company"
      ),
      closingAgent: Yup.string().required("Please select a closing agent"),
      buyersNotice: Yup.number().required("Required").min(0),
      includeSewerInspection: Yup.boolean(),
      additionalTimeForInspections: Yup.number().required("Required").min(0),
      applicationKickStart: Yup.number()
        .min(5, "Minimum select is five")
        .required("Required"),
      sellersResponseTime: Yup.number().required("Required").min(0),
      buyersReplyTime: Yup.number().required("Required").min(0),
      repairCompletionDate: Yup.number().required("Required").min(0),
      neighborhoodReviewContingency: Yup.boolean(),
      neighborhoodReviewDays: Yup.number().when(
        "neighborhoodReviewContingency",
        {
          is: true,
          then: (s) => s.required("Contact date is required"),
        }
      ),
    }),

    onSubmit: async (values) => {
      const buyerFullName = values.buyer;
      const sellerFullName = values.seller;

      const buyerProfile = clientProfiles?.firebase?.profiles?.find(
        (profile) =>
          profile.firstName + " " + profile.lastName === buyerFullName
      );
      const sellerProfile = clientProfiles?.firebase?.profiles?.find(
        (profile) =>
          profile.firstName + " " + profile.lastName === sellerFullName
      );

      const buyerAddress = buyerProfile ? buyerProfile.currentAddress : "";
      const sellerAddress = sellerProfile ? sellerProfile.currentAddress : "";

      const buyerPhoneNo = buyerProfile ? buyerProfile.phone : "";
      const sellerPhoneNo = sellerProfile ? sellerProfile.phone : "";

      const buyerEmail = buyerProfile ? buyerProfile.email : "";
      const sellerEmail = sellerProfile ? sellerProfile.email : "";

      const buyerCityStateZip = buyerProfile
        ? `${buyerProfile.city} ${buyerProfile.state} ${buyerProfile.zip}`
        : "";
      const sellerCityStateZip = sellerProfile
        ? `${sellerProfile.city} ${sellerProfile.state} ${sellerProfile.zip}`
        : "";

      const userDetails = {
        address: values.address,
        buyer: values.buyer,
        seller: values.seller,
        price: values.price,
        closingDate: values.closingDate,
        titleInsuranceCompany: values.titleInsuranceCompany,
        closingAgent: values.closingAgent,
        zpidDeatils: zpidDeatils,
        buyerAddress: buyerAddress,
        sellerAddress: sellerAddress,
        buyerCityStateZip: buyerCityStateZip,
        sellerCityStateZip: sellerCityStateZip,
        sellerPhoneNo: sellerPhoneNo,
        buyerPhoneNo: buyerPhoneNo,
        sellerEmail: sellerEmail,
        buyerEmail: buyerEmail,
        loanType: values.loanType,
        loanTypeOtherText: values.loanTypeOtherText,
        downPayment: values.downPayment,
        loanCostProvisions: values.loanCostProvisions,
        financialContingency: values.financialContingency,
        applicationKickStart: values.applicationKickStart,
        buyersNotice: values.buyersNotice,
        inspectionContingency: values.inspectionContingency,
        includeSewerInspection: values.includeSewerInspection,
        additionalTimeForInspections: values.additionalTimeForInspections,
        sellersResponseTime: values.sellersResponseTime,
        buyersReplyTime: values.buyersReplyTime,
        repairCompletionDate: values.repairCompletionDate,
        neighborhoodReviewContingency: values.neighborhoodReviewContingency,
        neighborhoodReviewDays: values.neighborhoodReviewDays,
      };
      console.log("Calling the redux API");
      dispatch(setUserDetails(userDetails));
      navigate(`/pdf_viewer`);
    },
  });
  useEffect(() => {
    dispatch(fetchApiDataRequest());
    dispatch(fetchProfilesStart());
    dispatch(getVendorProfileRequest());
  }, []);

  useEffect(() => {
    if (userDetailsData?.userZPID?.success) {
      setZpidDetails(userDetailsData.userZPID?.details);
    }
    if (userDetailsData?.firebase?.profiles) {
      setClientProfiles(userDetailsData);
    }
  }, [userDetailsData?.userZPID, userDetailsData?.userZPID?.success]);

  useEffect(() => {
    if (userDetailsData.api?.success) setAddress(userDetailsData.api.data);
  }, [userDetailsData.api.data, userDetailsData.api.success]);

  const handleAddressChange = (e) => {
    const zpid = e.target.value;
    dispatch(getUsersAddressRequest(zpid));
  };

  const areFieldsValidForCurrentStep = useStepFieldValidator(
    formik,
    currentStep
  );

  const renderStep = ({ currentStep }) => {
    switch (currentStep) {
      case 1:
        return (
          <StepOneForm
            formik={formik}
            handleAddressChange={handleAddressChange}
            clientProfiles={clientProfiles}
            address={address}
            nextStep={nextStep}
            displayPDF={displayPDF}
            currentStep={currentStep}
            useStepFieldValidator={useStepFieldValidator}
          />
        );
      case 2:
        return (
          <FinancialContingencyForm
            formik={formik}
            FormFeedback={FormFeedback}
          />
        );
      case 3:
        return <InspectionContingencyForm formik={formik} />;
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <React.Fragment>
      <Stepper
        steps={[
          { label: "Step 1" },
          { label: "Financial Contingency" },
          { label: "Inspection Contingency" },
        ]}
        activeStep={currentStep}
      />
      <>{renderStep({ currentStep: currentStep })}</>

      <Row>
        <Col md={6}>
          {currentStep > 1 && (
            <Button color="primary" onClick={prevStep}>
              Previous
            </Button>
          )}
        </Col>
        <Col md={6} style={{ display: "flex", justifyContent: "flex-end" }}>
          {currentStep < totalSteps && currentStep !== 1 ? (
            <Button
              color="primary"
              onClick={nextStep}
              disabled={
                !areFieldsValidForCurrentStep ||
                Object.keys(formik.errors).length > 0
              }
            >
              Next
            </Button>
          ) : (
            currentStep !== 1 && (
              <Button
                color="success"
                type="submit"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                Submit
              </Button>
            )
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CreateContactForm;

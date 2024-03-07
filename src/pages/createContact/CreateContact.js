import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
  Alert,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import WebViewer from "@pdftron/webviewer";
import PdfData from "../../assets/pdf/abc.pdf";
import {
  uploadTextRequest,
  setUserDetails,
  fetchProfilesStart,
} from "../../store/createContact/actions";
import Styles from "../../../src/assets/scss/pages/_createClient.scss";
import {
  fetchApiDataRequest,
  getUsersAddressRequest,
} from "../../store/createContact/actions";
import axios from "axios";
import OpenAIResponse from "./Model";
import Loader from "../../Components/Common/Loader";
import { Stepper } from "react-form-stepper";
import StepOneForm from "./StepOneForm";
import FinancialContingencyForm from "./FinancialContingencyForm";
import InspectionContingencyForm from "./InspectionContingencyForm";
import { useNavigate } from "react-router-dom";

const CreateContactForm = ({ onSubmit }) => {
  const webViewerInstance = useRef(null);
  const dispatch = useDispatch();

  const [clientProfiles, setClientProfiles] = useState([]);
  const [pdfInstance, setPdfInstance] = useState(null);
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const [displayPDF, setDisplayPDF] = useState(false);
  const [pdfDataString, setPDFDataString] = useState("");
  const [address, setAddress] = useState();
  const [zpidDeatils, setZpidDetails] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [uploadDocument, setUploadDocument] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState("");

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
            "offerExpirationDate",
            "closingDate",
            "titleInsuranceCompany",
            "closingAgent",
            "possessionDate",
          ];
        case 2:
          return [
            "financialContingency",
            "loanType",
            "downPayment",
            "loanCostProvisions",
            "applicationKickStart",
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

  const toggleModal = () => setModalOpen(!modalOpen);

  const formData = useSelector((state) => state.textUploadReducer);
  const userDetailsData = useSelector((state) => state.textUploadReducer);
  const formik = useFormik({
    initialValues: {
      address: "",
      buyer: "",
      seller: "",
      price: "",
      offerExpirationDate: "",
      closingDate: "",
      titleInsuranceCompany: "",
      closingAgent: "",
      possessionDate: "",
      loanType: "",
      loanTypeOtherText: "",
      downPayment: "",
      loanCostProvisions: "",
      financialContingency: false,
      applicationKickStart: "",
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
      offerExpirationDate: Yup.date().required("Please select a start date"),
      closingDate: Yup.date().required("Please select an end date"),
      titleInsuranceCompany: Yup.string().required(
        "Please enter the title insurance company"
      ),
      closingAgent: Yup.string().required("Please select a closing agent"),
      possessionDate: Yup.date().required("Please select an possesion date"),
      buyersNotice: Yup.number().required("Required").min(0),
      includeSewerInspection: Yup.boolean(),
      // loanType: Yup.string().required("Please loantype"),
      additionalTimeForInspections: Yup.number().required("Required").min(0),
      // loanCostProvisions: Yup.number().required(
      //   "Loan cost provisions are required"
      // ),
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

      const buyerProfile = clientProfiles.find(
        (profile) =>
          profile.firstName + " " + profile.lastName === buyerFullName
      );
      const sellerProfile = clientProfiles.find(
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

      if (pdfInstance && documentLoaded) {
        const userDetails = {
          address: values.address,
          buyer: values.buyer,
          seller: values.seller,
          price: values.price,
          offerExpirationDate: values.offerExpirationDate,
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
          possessionDate: values.possessionDate,
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
        dispatch(setUserDetails(userDetails));
      }
    },
  });
  useEffect(() => {
    dispatch(fetchApiDataRequest());
    dispatch(fetchProfilesStart());
  }, []);

  useEffect(() => {
    if (formData?.userZPID?.success) {
      setZpidDetails(formData.userZPID?.details);
    }
    if (userDetailsData?.firebase?.profiles) {
      setClientProfiles(userDetailsData?.firebase?.profiles);
    }
  }, [formData?.userZPID, formData?.userZPID?.success]);

  useEffect(() => {
    if (formData.api?.success) setAddress(formData.api.data);
  }, [formData.api.data, formData.api.success]);

  useEffect(() => {
    if (!webViewerInstance.current) {
      WebViewer(
        {
          path: "/webviewer/lib",
          initialDoc: PdfData,
          licenseKey: process.env.REACT_APP_PDFTRON_LICENSEKEY,
          fullAPI: true,
        },
        document.getElementById("your-webviewer-container-id")
      ).then((instance) => {
        webViewerInstance.current = instance;
        setPdfInstance(instance);

        instance.Core.documentViewer.addEventListener("documentLoaded", () => {
          setDocumentLoaded(true);

          instance.UI.setToolMode(instance.UI.ToolModes.TextSelect);

          instance.Core.documentViewer.addEventListener(
            "textSelected",
            async () => {
              const selectedText =
                await instance.Core.documentViewer.getSelectedText();
            }
          );
        });
      });
    }
    return () => {
      if (
        webViewerInstance.current &&
        typeof webViewerInstance.current.dispose === "function"
      ) {
        webViewerInstance.current.dispose();
      }
    };
  }, []);
  console.log(
    userDetailsData?.firebase?.profiles,
    "Uploaded text to chatgpt",
    userDetailsData?.userDetails
  );

  useEffect(() => {
    if (userDetailsData?.userDetails && pdfInstance) {
      modifyPdf(pdfInstance, userDetailsData?.userDetails);
    }
  }, [userDetailsData?.userDetails]);

  const modifyPdf = async (pdfInstance, userDetails) => {
    const { documentViewer, annotationManager } = pdfInstance.Core;
    console.log("documentViewer", documentViewer);
    if (documentViewer.getDocument()) {
      await modifyPdfAnnotations(pdfInstance, userDetails);
    } else {
      documentViewer.addEventListener("documentLoaded", async () => {
        await modifyPdfAnnotations(pdfInstance, userDetails);
      });
    }
  };
  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  console.log("hhh==", userDetailsData, pdfInstance, formik.errors);

  const myDate = new Date("2024-02-01");

  const modifyPdfAnnotations = async (pdfInstance, userDetails) => {
    const { documentViewer, annotationManager } = pdfInstance.Core;

    if (!documentViewer.getDocument()) {
      console.log("Document not yet loaded.");
      return;
    }

    await annotationManager.importAnnotations();

    const annotationsList = annotationManager.getAnnotationsList();
    let isModified = false;
    const appliances = zpidDeatils?.resoFacts?.appliances || [];

    const fieldValueSetters = {
      S_Name: () => userDetails.seller,
      B_Name: () => userDetails.buyer,
      PI_AgrDtLong: () => formatDate(myDate),
      PI_City: () => zpidDeatils?.address?.city,
      PI_State: () => zpidDeatils?.address?.state,
      PI_Zip: () => zpidDeatils?.address?.zipcode,
      PI_County: () => zpidDeatils?.country,
      OfferExpire: () => userDetails?.offerExpirationDate,
      TitleCompany: () => userDetails?.titleInsuranceCompany,
      PI_SellPrice: () => userDetails?.price,
      ClosingAgent1: () => userDetails?.closingAgent,
      ClosingDate: () => userDetails?.closingDate,
      EM2: () => "Yes",
      PD1: () => "Yes",
      u1: () => "Yes",
      assess1: () => "Yes",
      FIRPTA1: () => "Yes",
      B_Address: () => userDetails?.buyerAddress,
      S_Address: () => userDetails?.sellerAddress,
      B_CityStateZip: () => userDetails?.buyerCityStateZip,
      S_CityStateZip: () => userDetails?.sellerCityStateZip,
      B_Phone: () => userDetails?.buyerPhoneNo,
      S_Phone: () => userDetails?.sellerPhoneNo,
      B_Email: () => userDetails?.buyerEmail,
      PI_APN: () =>
        zpidDeatils?.parcelId
          ? zpidDeatils?.parcelId
          : zpidDeatils?.parcelNumber,
      S_Email: () => userDetails?.sellerEmail,
      stove: () => (appliances.includes("Stove") ? "Yes" : "No"),
      fridge: () => (appliances.includes("Refrigerator") ? "Yes" : "No"),
      washer: () => (appliances.includes("Washer") ? "Yes" : "No"),
      dryers: () => (appliances.includes("Dryer") ? "Yes" : "No"),
      dish: () => (appliances.includes("Dishwasher") ? "Yes" : "No"),
      hottubs: () => (appliances.includes("Hottub") ? "Yes" : "No"),
      woodstove: () => (appliances.includes("WoodStove") ? "Yes" : "No"),
      fd: () => (appliances.includes("fd") ? "Yes" : "No"),
      sd: () => (appliances.includes("sd") ? "Yes" : "No"),
      security: () => (appliances.includes("Security") ? "Yes" : "No"),
      tv: () => (appliances.includes("Television") ? "Yes" : "No"),
      speakers: () => (appliances.includes("Speakers") ? "Yes" : "No"),
      micro: () => (appliances.includes("Microwave") ? "Yes" : "No"),
      generator: () => (appliances.includes("Refrigerator") ? "Yes" : "No"),
      other: () => "Other Appliance",
    };

    annotationsList.forEach((annotation) => {
      if (annotation instanceof pdfInstance.Core.Annotations.WidgetAnnotation) {
        setDisplayPDF(true);
        const field = annotation.getField();
        if (
          
          field &&
          Object.prototype.hasOwnProperty.call(fieldValueSetters, field.name)
        ) {
          field.setValue(fieldValueSetters[field.name]());
          annotationManager.updateAnnotation(annotation);
          annotationManager.redrawAnnotation(annotation);
          isModified = true;
        }
      }
    });

    if (isModified) {
      const xfdf = await annotationManager.exportAnnotations();
      const data = await documentViewer
        .getDocument()
        .getFileData({ xfdfString: xfdf });

      const blob = new Blob([new Uint8Array(data)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "UpdatedDocument.pdf";
      document.body.appendChild(downloadLink);
      //downloadLink.click();
      downloadLink.remove();
      URL.revokeObjectURL(url);
      // const pdfDataString = await extractAllPdfDataAsString(pdfInstance);
    } else {
      console.log("No modifications made to the PDF");
    }
    if (webViewerInstance.current && webViewerInstance.current.Core.PDFNet) {
      const pdfDataString = await extractAllPdfDataAsString(
        webViewerInstance.current
      );
      //console.log("Extracted PDF Data:", pdfDataString);
    } else {
      console.error("PDFNet is not available or not initialized.");
    }
  };

  const extractAllPdfDataAsString = async (pdfInstance) => {
    const {
      Core: { PDFNet },
    } = pdfInstance;
    await PDFNet.initialize();

    if (!PDFNet) {
      console.error("PDFNet is not available.");
      return "";
    }

    let allPdfData = "";

    try {
      const doc = await pdfInstance.Core.documentViewer
        .getDocument()
        .getPDFDoc();
      await doc.lock();

      const textExtractor = await PDFNet.TextExtractor.create();
      const pageCount = await doc.getPageCount();
      for (let i = 1; i <= pageCount; i++) {
        const page = await doc.getPage(i);
        textExtractor.begin(page);
        const pageText = await textExtractor.getAsText();
        allPdfData += pageText + "\n";
      }

      // Extract form field data
      const fieldIterator = await doc.getFieldIteratorBegin();
      for (; await fieldIterator.hasNext(); fieldIterator.next()) {
        const field = await fieldIterator.current();
        const fieldName = await field.getName();
        const fieldValue = await field.getValueAsString();
        allPdfData += `${fieldName}: ${fieldValue}\n`;
      }
      await doc.unlock();
    } catch (error) {
      console.error("Error extracting data from PDF:", error);
    }
    setPDFDataString(allPdfData);
    setUploadDocument(true);
    return allPdfData;
  };

  const handleAddressChange = (e) => {
    const zpid = e.target.value;
    dispatch(getUsersAddressRequest(zpid));
  };
  const GptTextUploader = async (allPdfData) => {
    const lines = allPdfData.split("\n");
    const filteredLines = lines.filter((line) => !line.trim().match(/^\d+$/));
    const data = filteredLines.join("\n");
    setLoading(true);
    setModalContent("");
    dispatch(uploadTextRequest(data));
  };
  useEffect(() => {
    if (
      userDetailsData?.success &&
      modalContent === "" &&
      !userDetailsData?.loading
    ) {
      setLoading(false);
      setUploadDocument(false);
      setModalContent(userDetailsData?.data);
    } else if (userDetailsData?.error) {
      setLoading(false);
      setModalContent(userDetailsData?.error);
    }
  }, [userDetailsData]);

  const handleTextSelection = async () => {
    const {
      Core: { PDFNet },
    } = pdfInstance;

    await PDFNet.initialize();
    const doc = await pdfInstance.Core.documentViewer.getDocument().getPDFDoc();
    await doc.lock();

    let textData = "";
    const fieldIterator = await doc.getFieldIteratorBegin();
    for (; await fieldIterator.hasNext(); fieldIterator.next()) {
      const field = await fieldIterator.current();
      const fieldName = await field.getName();
      const fieldValue = await field.getValueAsString();
      textData += `${fieldName}: ${fieldValue}\n`;
    }

    const selectedText =
      await pdfInstance.Core.documentViewer.getSelectedText();
    const keyValueRegex = /:\s*[\w\s]{0,40}(\n|$)/;
    const hasKeyValuePair = keyValueRegex.test(selectedText);

    if (!hasKeyValuePair && selectedText.trim() !== "") {
      textData += selectedText;
    } else if (hasKeyValuePair) {
      //console.log("Key-value pair detected, text not logged.");
    }

    setExtractedData(textData);
    GptTextUploader(textData);
    //console.log("textData", textData);
    await doc.unlock();
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
            modalContent={modalContent}
            uploadDocument={uploadDocument}
            loading={loading}
            pdfDataString={pdfDataString}
            GptTextUploader={GptTextUploader}
            handleTextSelection={handleTextSelection}
            setModalContent={setModalContent}
            currentStep={currentStep}
            Loader={Loader}
            useStepFieldValidator={useStepFieldValidator}
          />
        );
      case 2:
        return (
          <FinancialContingencyForm
            formik={formik}
            prevStep={prevStep}
            nextStep={nextStep}
            FormFeedback={FormFeedback}
          />
        );
      case 3:
        return (
          <InspectionContingencyForm
            formik={formik}
            prevStep={prevStep}
            FormFeedback={FormFeedback}
            onSubmit={() => {
              console.log("Final form values", formik.values);
            }}
          />
        );
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
              disabled={!areFieldsValidForCurrentStep}
            >
              Next
            </Button>
          ) : (
            currentStep !== 1 && (
              <Button
                color="success"
                type="submit"
                onClick={() => {
                  formik.handleSubmit()
                  navigate(`/pdf_viewer`);
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

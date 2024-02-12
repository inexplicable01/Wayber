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
import Styles from "../../../src/assets/scss/pages/_createClient.scss";
import {
  fetchApiDataRequest,
  getUsersAddressRequest,
} from "../../store/clientProfile/actions";
import axios from "axios";
import OpenAIResponse from "./Model";
import Loader from "../../Components/Common/Loader";

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

  // Function to toggle modal visibility
  const toggleModal = () => setModalOpen(!modalOpen);

  const formData = useSelector((state) => state.clientProfileReducer);
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
    }),

    onSubmit: async (values) => {
      console.log(values);
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

      // Extracting address and contact details for both buyer and seller
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
        };
        modifyPdf(pdfInstance, userDetails);
      }
    },
  });
  useEffect(() => {
    dispatch(fetchApiDataRequest());
  }, []);

  useEffect(() => {
    if (formData?.userZPID?.success) {
      setZpidDetails(formData.userZPID?.details);
      // console.log(formData.userZPID?.details?.resoFacts?.appliances,"suc cess");
    }
  }, [formData?.userZPID, formData?.userZPID?.success]);

  useEffect(() => {
    if (formData.api?.success) setAddress(formData.api.data);
  }, [formData.api.data, formData.api.success]);
  useEffect(() => {
    const db = firebase.firestore();
    const myCollection = db.collection("ClientProfile");

    myCollection
      .get()
      .then((querySnapshot) => {
        const profiles = [];
        querySnapshot.forEach((doc) => {
          profiles.push({ id: doc.id, ...doc.data() });
        });
        //console.log("profiles", profiles);
        setClientProfiles(profiles);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  useEffect(() => {
    if (!webViewerInstance.current) {
      WebViewer(
        {
          path: "/webviewer/lib",
          initialDoc: PdfData,
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
              //console.log("Selected text:", selectedText);
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

  const modifyPdf = async (pdfInstance, userDetails) => {
    // console.log(userDetails?.zpidDeatils?.address,"jnjkjjbkjbjbubjkbjbjbjbj");
    const { documentViewer, annotationManager } = pdfInstance.Core;

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
    console.log("appliances", appliances);

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

      // Extract textual content
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

    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: data,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      console.log(response?.choices[0].message.content, "response");
      setModalContent(response?.choices[0].message.content);
      toggleModal();
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

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
    GptTextUploader(textData)
    //console.log("textData", textData);
    await doc.unlock();
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={formik.handleSubmit}
        className="fontFamily_Roboto_sans_serif"
      >
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="select"
                name="address"
                id="address"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleAddressChange(e);
                }}
                value={formik.values.address}
                invalid={formik.touched.address && !!formik.errors.address}
                className="p13"
              >
                <option value="">Select Address</option>
                {address?.slice(0, 10)?.map((property) => (
                  <option key={property.zpid} value={property.zpid}>
                    <div>
                      {`${property.streetAddress}, ${property.city}, ${property.state} ${property.zipcode}`}
                    </div>
                  </option>
                ))}
              </Input>
              {formik.touched.address && formik.errors.address ? (
                <FormFeedback type="invalid">
                  {formik.errors.address}
                </FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="buyer">Buyer</Label>
              <Input
                type="select"
                name="buyer"
                id="buyer"
                onChange={formik.handleChange}
                value={formik.values.buyer}
                invalid={formik.touched.buyer && !!formik.errors.buyer}
                className="p13"
              >
                <option value="">Select Buyer</option>
                {clientProfiles.map((profile, i) => {
                  if (profile.role === "Buyer") {
                    return (
                      <option
                        key={i}
                        value={profile.firstName + " " + profile.lastName}
                      >
                        {profile.firstName + " " + profile.lastName}
                      </option>
                    );
                  }
                  return null;
                })}
              </Input>
              {formik.touched.buyer && formik.errors.buyer && (
                <FormFeedback>{formik.errors.buyer}</FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="seller">Seller</Label>
              <Input
                type="select"
                name="seller"
                id="seller"
                onChange={formik.handleChange}
                value={formik.values.seller}
                invalid={formik.touched.seller && !!formik.errors.seller}
                className="p13"
              >
                <option value="">Select Seller</option>
                {clientProfiles.map((profile, i) => {
                  if (profile.role === "Seller") {
                    return (
                      <option
                        key={i}
                        value={profile.firstName + " " + profile.lastName}
                      >
                        {profile.firstName + " " + profile.lastName}
                      </option>
                    );
                  }
                  return null;
                })}
              </Input>
              {formik.touched.seller && formik.errors.seller && (
                <FormFeedback>{formik.errors.seller}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="closingAgent">Closing Agent</Label>
              <Input
                type="select"
                name="closingAgent"
                id="closingAgent"
                onChange={formik.handleChange}
                value={formik.values.closingAgent}
                invalid={
                  formik.touched.closingAgent && !!formik.errors.closingAgent
                }
                className="p13"
              >
                <option value="">Select Closing Agent</option>
                {clientProfiles.map((profile, index) => {
                  if (profile.role === "Closing Agent") {
                    return (
                      <option
                        key={index}
                        value={profile.firstName + " " + profile.lastName}
                      >
                        {profile.firstName + " " + profile.lastName}
                      </option>
                    );
                  }
                  return null;
                })}
              </Input>
              {formik.touched.closingAgent && formik.errors.closingAgent && (
                <FormFeedback type="invalid">
                  {formik.errors.closingAgent}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="offerExpirationDate">Offer Expiration Date</Label>
              <Input
                id="offerExpirationDate"
                name="offerExpirationDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.offerExpirationDate}
                invalid={
                  formik.touched.offerExpirationDate &&
                  !!formik.errors.offerExpirationDate
                }
                className="p13"
              />
              {formik.touched.offerExpirationDate &&
                formik.errors.offerExpirationDate && (
                  <FormFeedback>
                    {formik.errors.offerExpirationDate}
                  </FormFeedback>
                )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="closingDate">Closing Date</Label>
              <Input
                id="closingDate"
                name="closingDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.closingDate}
                invalid={
                  formik.touched.closingDate && !!formik.errors.closingDate
                }
                className="p13"
              />
              {formik.touched.closingDate && formik.errors.closingDate && (
                <FormFeedback>{formik.errors.closingDate}</FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="titleInsuranceCompany">Title Insurance Company</Label>
              <Input
                id="titleInsuranceCompany"
                name="titleInsuranceCompany"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.titleInsuranceCompany}
                invalid={
                  formik.touched.titleInsuranceCompany &&
                  !!formik.errors.titleInsuranceCompany
                }
                className="p13"
              />
              {formik.touched.titleInsuranceCompany &&
                formik.errors.titleInsuranceCompany && (
                  <FormFeedback type="invalid">
                    {formik.errors.titleInsuranceCompany}
                  </FormFeedback>
                )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                invalid={formik.touched.price && !!formik.errors.price}
              />
              {formik.touched.price && formik.errors.price && (
                <FormFeedback>{formik.errors.price}</FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Button id="modifyPdfButton" type="submit" color="success">
          Generate PDF
        </Button>
        <div
          className={displayPDF ? "display_block" : "display_none"}
          id="your-webviewer-container-id"
          style={{ height: "100dvh" }}
        ></div>
        {uploadDocument &&
        
            <div className="uploadButtonsContainer">
              {loading ? <div className="loaderContainer"> <Loader/> </div>:  <>
              <Button
                onClick={() => GptTextUploader(pdfDataString)}
                color="success"
              >
                Upload
              </Button>
              <Button onClick={handleTextSelection}>
                Upload selected text
              </Button>
              </> }
            
            </div>
        }

        <OpenAIResponse
          isOpen={modalOpen}
          toggle={toggleModal}
          title="API Response"
          content={modalContent}
          setUploadDocument={setUploadDocument}
        />
      </Form>
    </React.Fragment>
  );
};

export default CreateContactForm;

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

  const formData = useSelector((state) => state.clientProfileReducer);
  const formik = useFormik({
    initialValues: {
      address: "",
      buyer: "",
      user: "",
      price: "",
      contractStartDate: "",
      contractEndDate: "",
    },

    validationSchema: Yup.object({
      address: Yup.string().required("Please select an address"),
      buyer: Yup.string().required("Please select a buyer"),
      user: Yup.string().required("Please select a user"),
      price: Yup.number().required("Please enter a price"),
      contractStartDate: Yup.date().required("Please select a start date"),
      contractEndDate: Yup.date().required("Please select an end date"),
    }),

    onSubmit: async (values) => {
      //console.log(values);
      if (pdfInstance && documentLoaded) {
        //settest(true);
        const userDetails = {
          address: values.address,
          buyer: values.buyer,
          seller: values.user,
          price: values.price,
          contractStartDate: values.contractStartDate,
          contractEndDate: values.contractEndDate,
          zpidDeatils:zpidDeatils
        };
        modifyPdf(pdfInstance, userDetails);
        // modifyPdf(pdfInstance, userDetails).then(async () => {
        //   if (webViewerInstance.current && webViewerInstance.current.Core.PDFNet) {
        //     const pdfDataString = await extractAllPdfDataAsString(webViewerInstance.current);
        //     console.log("Extracted PDF Data:", pdfDataString);
        //   } else {
        //     console.error("PDFNet is not available or not initialized.");
        //   }
        // });
      }
    },
  });
  useEffect(() => {
    dispatch(fetchApiDataRequest());
  }, []);

  useEffect(() => {
    if (formData?.userZPID?.success) {
      setZpidDetails(formData.userZPID?.details);
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
          instance.PDFNet.initialize().then(() => {});
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
    //console.log(userDetails?.zpidDeatils?.address,"jnjkjjbkjbjbubjkbjbjbjbj");
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
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  const myDate = new Date('2024-02-01');
  
  const modifyPdfAnnotations = async (pdfInstance, userDetails) => {
    const { documentViewer, annotationManager } = pdfInstance.Core;

    if (!documentViewer.getDocument()) {
      console.log("Document not yet loaded.");
      return;
    }

    await annotationManager.importAnnotations();

    const annotationsList = annotationManager.getAnnotationsList();

    let isModified = false;

    for (let i = 0; i < annotationsList.length; i++) {
      const annotation = annotationsList[i];
      if (annotation instanceof pdfInstance.Core.Annotations.WidgetAnnotation) {
        setDisplayPDF(true);
        const field = annotation.getField();

        if (field) {
          const fieldName = field.name;
          if (fieldName === "S_Name") {
            field.setValue(userDetails.seller);
            annotationManager.updateAnnotation(annotation);
            annotationManager.redrawAnnotation(annotation);
            isModified = true;
          } else if (fieldName === "B_Name") {
            field.setValue(userDetails.buyer);
            annotationManager.updateAnnotation(annotation);
            annotationManager.redrawAnnotation(annotation);
            isModified = true;
          }
           else if (fieldName === "PI_AgrDtLong") {
            field.setValue(formatDate(myDate));
            annotationManager.updateAnnotation(annotation);
            annotationManager.redrawAnnotation(annotation);
            isModified = true;
          }
           else if (fieldName === "PI_City") {
            field.setValue(zpidDeatils?.address?.city);
            annotationManager.updateAnnotation(annotation);
            annotationManager.redrawAnnotation(annotation);
            isModified = true;
          }
           else if (fieldName === "PI_State") {
            field.setValue(zpidDeatils?.address?.state);
            annotationManager.updateAnnotation(annotation);
            annotationManager.redrawAnnotation(annotation);
            isModified = true;
          }
           else if (fieldName === "PI_Zip") {
            field.setValue(zpidDeatils?.address?.zipcode);
            annotationManager.updateAnnotation(annotation);
            annotationManager.redrawAnnotation(annotation);
            isModified = true;
          }
           else if (fieldName === "PI_County") {
            field.setValue(zpidDeatils?.country);
            annotationManager.updateAnnotation(annotation);
            annotationManager.redrawAnnotation(annotation);
            isModified = true;
          }
        }
      }
    }

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
    return allPdfData;
  };
  const handleAddressChange = (e) => {
    const zpid = e.target.value;
    dispatch(getUsersAddressRequest(zpid));
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
                {address?.slice(0,10)?.map((property) => (
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
                  if (profile.role !== "User") {
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
              <Label for="user">User</Label>
              <Input
                type="select"
                name="user"
                id="user"
                onChange={formik.handleChange}
                value={formik.values.user}
                invalid={formik.touched.user && !!formik.errors.user}
                className="p13"
              >
                <option value="">Select User</option>
                {clientProfiles.map((profile, i) => {
                  if (profile.role === "User") {
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
              {formik.touched.user && formik.errors.user && (
                <FormFeedback>{formik.errors.user}</FormFeedback>
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
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="contractStartDate">Contract Start Date</Label>
              <Input
                id="contractStartDate"
                name="contractStartDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.contractStartDate}
                invalid={
                  formik.touched.contractStartDate &&
                  !!formik.errors.contractStartDate
                }
                className="p13"
              />
              {formik.touched.contractStartDate &&
                formik.errors.contractStartDate && (
                  <FormFeedback>{formik.errors.contractStartDate}</FormFeedback>
                )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="contractEndDate">Contract End Date</Label>
              <Input
                id="contractEndDate"
                name="contractEndDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.contractEndDate}
                invalid={
                  formik.touched.contractEndDate &&
                  !!formik.errors.contractEndDate
                }
                className="p13"
              />
              {formik.touched.contractEndDate &&
                formik.errors.contractEndDate && (
                  <FormFeedback>{formik.errors.contractEndDate}</FormFeedback>
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
          style={{ height: "600px" }}
        ></div>
      </Form>
    </React.Fragment>
  );
};

export default CreateContactForm;

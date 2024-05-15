import React, { useState, useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";
import PdfData from "../../../assets/pdf/abc.pdf";
import InspectPdf from "../../../assets/pdf/inspection.pdf";
import financingPdf from "../../../assets/pdf/financing.pdf";
import { useSelector, useDispatch } from "react-redux";
import Styles from "../../../../src/assets/scss/pages/_createClient.scss";
import { uploadTextRequest } from "../../../store/createContact/actions";
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
function usePdfViewer({ selectedPdfIndex }) {
  const { user } = useSelector((state) => ({
    user: state.Profile.user,
  }));
  const { addDocumentToSign, firebaseStorage, searchForDocumentToSign } =
    getFirebaseBackend();
  const storage = firebaseStorage();
  const navigate = useNavigate();

  console.log(searchForDocumentToSign("email@example.com"));
  const webViewerInstance = useRef(null);
  const [pdfInstance, setPdfInstance] = useState(null);
  const [pdfDataString, setPDFDataString] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [dropPoint, setDropPoint] = useState(null);
  const dispatch = useDispatch();

  const pdfUrls = [PdfData, financingPdf, InspectPdf];
  const pdfName = ["PdfData", "financingPdf", "InspectPdf"];

  const formData = useSelector((state) => state.clientProfileReducer);
  const userDetailsData = useSelector((state) => state.textUploadReducer);
  const zpidDeatils = formData.userZPID?.details;

  const modifyPdf = async (pdfInstance, userDetails) => {
    if (!webViewerInstance.current) {
      console.error("WebViewer not initialized.");
      return;
    }
    const { documentViewer, annotationManager } = pdfInstance.Core;

    documentViewer.addEventListener("documentLoaded", async () => {
      await modifyPdfAnnotations(pdfInstance, userDetails);
    });
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

    documentViewer.addEventListener("annotationsLoaded", async () => {
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
        OfferExpire: () =>
          new Date(new Date().setDate(new Date().getDate() + 5))
            .toISOString()
            .split("T")[0],
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
        LAOther: () => userDetails?.loanTypeOtherText,
        LA1: () =>
          userDetails?.loanType?.includes("Conventional First") ? "Yes" : "No",
        LA2: () =>
          userDetails?.loanType?.includes("Conventional Second") ? "Yes" : "No",
        LA3: () => (userDetails?.loanType?.includes("Bridge") ? "Yes" : "No"),
        LA4: () => (userDetails?.loanType?.includes("VA") ? "Yes" : "No"),
        LA5: () => (userDetails?.loanType?.includes("FHA") ? "Yes" : "No"),
        LA6: () => (userDetails?.loanType?.includes("USDA") ? "Yes" : "No"),
        LA7: () =>
          userDetails?.loanType?.includes("Home Equity Line of Credit")
            ? "Yes"
            : "No",
        LAPP3: () => userDetails?.applicationKickStart,
        IC11: () => userDetails?.includeSewerInspection && "Yes",
        IC112: () => userDetails?.includeSewerInspection === false && "Yes",
        IC2: () => userDetails?.buyersNotice,
        IC3: () => userDetails?.additionalTimeForInspections,
        IC4: () => userDetails?.sellersResponseTime,
        IC5: () => userDetails?.buyersReplyTime,
        IC6: () => userDetails?.repairCompletionDate,
        NRC1: () => userDetails?.neighborhoodReviewDays && "Yes",
        NRC2: () => userDetails?.neighborhoodReviewDays,
      };

      annotationsList.forEach((annotation) => {
        if (
          annotation instanceof pdfInstance.Core.Annotations.WidgetAnnotation
        ) {
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
      } else {
        console.log("No modifications made to the PDF");
      }

      if (webViewerInstance.current && webViewerInstance.current.Core.PDFNet) {
        const pdfDataString = await extractAllPdfDataAsString(
          webViewerInstance.current
        );
      } else {
        console.error("PDFNet is not available or not initialized.");
      }
    });
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

  const GptTextUploader = async (allPdfData) => {
    const lines = allPdfData.split("\n");
    const filteredLines = lines.filter((line) => !line.trim().match(/^\d+$/));
    const data = filteredLines.join("\n");
    // console.log(data);
    setModalContent("");
    dispatch(uploadTextRequest(data));
  };
  const dragOver = (e) => {
    e.preventDefault();
    return false;
  };
  useEffect(() => {
    if (
      userDetailsData?.success &&
      modalContent === "" &&
      !userDetailsData?.loading
    ) {
      setModalContent(userDetailsData?.data);
    } else if (userDetailsData?.error) {
      setModalContent(userDetailsData?.error);
    }
  }, [userDetailsData]);

  useEffect(() => {
    if (!webViewerInstance.current) {
      WebViewer(
        {
          path: "/webviewer/lib",
          initialDoc: pdfUrls[selectedPdfIndex],
          licenseKey: process.env.REACT_APP_PDFTRON_LICENSEKEY,
          fullAPI: true,
        },
        document.getElementById("pdfViewer")
      ).then((instance) => {
        const { iframeWindow } = instance.UI;

        webViewerInstance.current = instance;
        setPdfInstance(instance);
        const iframeDoc = iframeWindow.document.body;
        iframeDoc.addEventListener("dragover", dragOver);
        iframeDoc.addEventListener("drop", (e) => {
          drop(e, instance);
        });
      });
    }
  }, []);

  const handleGenerate = (index) => {
    setModalContent("");
    userDetailsData && modifyPdf(pdfInstance, userDetailsData?.userDetails);
    if (webViewerInstance.current && pdfUrls[index]) {
      const { documentViewer } = webViewerInstance.current.Core;
      documentViewer.loadDocument(pdfUrls[index]);
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
    //setExtractedData(textData);
    GptTextUploader(textData);
    await doc.unlock();
  };

  const addField = (type, point = {}, name = "", value = "", flag = {}) => {
    console.log(type, point, name, value, "detils");
    const { documentViewer, Annotations } = pdfInstance.Core;
    const annotationManager = documentViewer.getAnnotationManager();
    const doc = documentViewer.getDocument();
    const displayMode = documentViewer.getDisplayModeManager().getDisplayMode();
    const page = displayMode.getSelectedPages(point, point);
    if (!!point.x && page.first == null) {
      return;
    }
    const page_idx =
      page.first !== null ? page.first : documentViewer.getCurrentPage();
    const page_info = doc.getPageInfo(page_idx);
    const page_point = displayMode.windowToPage(point, page_idx);
    const zoom = documentViewer.getZoomLevel();

    var textAnnot = new Annotations.FreeTextAnnotation();
    textAnnot.PageNumber = page_idx;
    const rotation = documentViewer.getCompleteRotation(page_idx) * 90;
    textAnnot.Rotation = rotation;
    if (rotation === 270 || rotation === 90) {
      textAnnot.Width = 50.0 / zoom;
      textAnnot.Height = 250.0 / zoom;
    } else {
      textAnnot.Width = 250.0 / zoom;
      textAnnot.Height = 50.0 / zoom;
    }
    textAnnot.X = (page_point.x || page_info.width / 2) - textAnnot.Width / 2;
    textAnnot.Y = (page_point.y || page_info.height / 2) - textAnnot.Height / 2;

    textAnnot.setPadding(new Annotations.Rect(0, 0, 0, 0));
    textAnnot.custom = {
      type,
      value,
      flag,
      name: `Please_${type}_`,
    };

    // set the type of annot
    textAnnot.setContents(textAnnot.custom.name);
    textAnnot.FontSize = "" + 20.0 / zoom + "px";
    textAnnot.FillColor = new Annotations.Color(211, 211, 211, 0.5);
    textAnnot.TextColor = new Annotations.Color(0, 165, 228);
    textAnnot.StrokeThickness = 1;
    textAnnot.StrokeColor = new Annotations.Color(0, 165, 228);
    textAnnot.TextAlign = "center";

    textAnnot.Author = annotationManager.getCurrentUser();

    annotationManager.deselectAllAnnotations();
    annotationManager.addAnnotation(textAnnot, true);
    annotationManager.redrawAnnotation(textAnnot);
    annotationManager.selectAnnotation(textAnnot);
  };
  const dragStart = (e) => {
    e.target.style.opacity = 0.5;
    const copy = e.target.cloneNode(true);
    copy.id = "form-build-drag-image-copy";
    copy.style.width = "250px";
    document.body.appendChild(copy);
    e.dataTransfer.setDragImage(copy, 125, 25);
    e.dataTransfer.setData("text", "");
  };

  const dragEnd = (e, type) => {
    addField(type, dropPoint);
    e.target.style.opacity = 1;
    document.body.removeChild(
      document.getElementById("form-build-drag-image-copy")
    );
    e.preventDefault();
  };
  const drop = (e, instance) => {
    console.log(instance);
    const { documentViewer } = instance.Core;
    const scrollElement = documentViewer.getScrollViewElement();
    const scrollLeft = scrollElement.scrollLeft || 0;
    const scrollTop = scrollElement.scrollTop || 0;
    setDropPoint({ x: e.pageX + scrollLeft, y: e.pageY + scrollTop });
    e.preventDefault();
    return false;
  };

  const uploadForSigning = async () => {
    const storageRef = storage.ref();
    const referenceString = `docToSign/${user?.uid}${Date.now()}.pdf`;
    const docRef = storageRef.child(referenceString);
    const { documentViewer, annotationManager } = pdfInstance.Core;
    const doc = documentViewer.getDocument();
    const xfdfString = await annotationManager.exportAnnotations({
      widgets: true,
      fields: true,
    });
    const data = await doc.getFileData({ xfdfString });
    const arr = new Uint8Array(data);
    const blob = new Blob([arr], { type: "application/pdf" });
    docRef.put(blob).then(function (snapshot) {
      console.log("Uploaded the blob");
    });
    const emails = ["email@example.com"];
    await addDocumentToSign(user?.uid, user?.email, referenceString, emails);
  };

  const applyFields = async () => {
    const { Annotations, documentViewer } = pdfInstance.Core;
    const annotationManager = documentViewer.getAnnotationManager();
    const fieldManager = annotationManager.getFieldManager();
    const annotationsList = annotationManager.getAnnotationsList();
    const annotsToDelete = [];
    const annotsToDraw = [];
  
    await Promise.all(
      annotationsList.map(async (annot, index) => {
        let inputAnnot;
        let field;
  
        if (typeof annot.custom !== 'undefined') {
          if (annot.custom.type === 'SIGNATURE') {
            field = new Annotations.Forms.Field(
              annot.getContents() + Date.now() + index,
              {
                type: 'Sig',
              },
            );
            inputAnnot = new Annotations.SignatureWidgetAnnotation(field, {
              appearance: '_DEFAULT',
              appearances: {
                _DEFAULT: {
                  Normal: {
                    data:
                      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuMWMqnEsAAAANSURBVBhXY/j//z8DAAj8Av6IXwbgAAAAAElFTkSuQmCC',
                    offset: {
                      x: 100,
                      y: 100,
                    },
                  },
                },
              },
            });
          }else {
            // exit early for other annotations
            annotationManager.deleteAnnotation(annot, false, true); // prevent duplicates when importing xfdf
            return;
          }
        } else {
          // exit early for other annotations
          return;
        }
  
        // set position
        inputAnnot.PageNumber = annot.getPageNumber();
        inputAnnot.X = annot.getX();
        inputAnnot.Y = annot.getY();
        inputAnnot.rotation = annot.Rotation;
        if (annot.Rotation === 0 || annot.Rotation === 180) {
          inputAnnot.Width = annot.getWidth();
          inputAnnot.Height = annot.getHeight();
        } else {
          inputAnnot.Width = annot.getHeight();
          inputAnnot.Height = annot.getWidth();
        }
  
        // delete original annotation
        annotsToDelete.push(annot);
  
        // customize styles of the form field
        Annotations.WidgetAnnotation.getCustomStyles = function (widget) {
          if (widget instanceof Annotations.SignatureWidgetAnnotation) {
            return {
              border: '1px solid #a5c7ff',
            };
          }
        };
        Annotations.WidgetAnnotation.getCustomStyles(inputAnnot);
  
        // draw the annotation the viewer
        annotationManager.addAnnotation(inputAnnot);
        fieldManager.addField(field);
        annotsToDraw.push(inputAnnot);
      }),
    );
  
    // delete old annotations
    annotationManager.deleteAnnotations(annotsToDelete, null, true);
  
    // refresh viewer
    await annotationManager.drawAnnotationsFromList(annotsToDraw);
    await uploadForSigning();
  };

  return {
    modalContent,
    userDetailsData,
    handleTextSelection,
    GptTextUploader,
    pdfDataString,
    pdfName,
    handleGenerate,
    pdfInstance,
    dragStart,
    dragEnd,
    addField,
    applyFields,
  };
}

export default usePdfViewer;

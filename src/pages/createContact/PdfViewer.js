import React, { useState, useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";
import PdfData from "../../assets/pdf/abc.pdf";
import InspectPdf from "../../assets/pdf/inspection.pdf";
import financingPdf from "../../assets/pdf/financing.pdf";
import { useSelector, useDispatch } from "react-redux";
import Styles from "../../../src/assets/scss/pages/_createClient.scss";
import { uploadTextRequest } from "../../store/createContact/actions";
import { Button } from "reactstrap";
import Loader from "../../../src/Components/Common/Loader";
function PdfViewer() {
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
  const webViewerInstance = useRef(null);
  const [pdfInstance, setPdfInstance] = useState(null);
  const [pdfDataString, setPDFDataString] = useState("");
  const [modalContent, setModalContent] = useState("");

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
        IC112: () => userDetails?.includeSewerInspection == false && "Yes",
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
    console.log(data);
    setModalContent("");
    dispatch(uploadTextRequest(data));
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
        webViewerInstance.current = instance;
        setPdfInstance(instance);
      });
    }
  }, []);
  useEffect(() => {
    if (pdfInstance) {
      handleGenerate(selectedPdfIndex);
    }
  }, [pdfInstance, selectedPdfIndex]);

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

  return (
    <div className="pdfViewerContainerStyle">
      <div className="pdfSelectionContainerStyle">
        {pdfName.map((name, index) => (
          <div
            key={index}
            onClick={() => {
              handleGenerate(index);
              setSelectedPdfIndex(index);
            }}
            className={`pdfPreview ${
              selectedPdfIndex === index ? "selectedPdf" : "unselectedPdf"
            }`}
          >
            {name}.pdf
          </div>
        ))}
      </div>
      {userDetailsData?.loading ? (
        <Loader />
      ) : (
        <div style={{display:'flex', gap:20}}>
          <Button onClick={handleTextSelection} >
            Upload Selected text
          </Button>
          <Button
            onClick={() => GptTextUploader(pdfDataString)}
            color="success"
          >
            Upload
          </Button>
        </div>
      )}
      <div className="conatiner">
        <div id="pdfViewer" className="pdfDisplayStyle"></div>
        <div className="apiResponseContainer">
          <p className="apiResponseHeading">API Response:</p>
          <p>
            {userDetailsData?.loading ? (
              <Loader />
            ) : modalContent ? (
              modalContent
            ) : (
              "Upload document"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PdfViewer;

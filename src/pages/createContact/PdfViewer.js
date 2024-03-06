import React, { useState, useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";
import PdfData from "../../assets/pdf/abc.pdf";
import InspectPdf from "../../assets/pdf/inspection.pdf";
import financingPdf from "../../assets/pdf/financing.pdf";
import { useSelector } from "react-redux";

function PdfViewer() {
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
  const webViewerInstance = useRef(null);
  const [pdfInstance, setPdfInstance] = useState(null);

  const pdfUrls = [PdfData, financingPdf, InspectPdf];
  const pdfName = ["PdfData", "financingPdf", "InspectPdf"];

  const formData = useSelector((state) => state.clientProfileReducer);
  const userDetailsData = useSelector((state) => state.textUploadReducer);
  const zpidDeatils = formData.userZPID?.details;

  const modifyPdf = async (pdfInstance, userDetails) => {
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

    documentViewer.addEventListener("annotationsLoaded", () => {
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
        LAOther: () => userDetails?.loanTypeOtherText,
        LA1: () =>
          userDetails?.loanType.includes("Conventional First") ? "Yes" : "No",
        LA2: () =>
          userDetails?.loanType.includes("Conventional Second") ? "Yes" : "No",
        LA3: () => (userDetails?.loanType.includes("Bridge") ? "Yes" : "No"),
        LA4: () => (userDetails?.loanType.includes("VA") ? "Yes" : "No"),
        LA5: () => (userDetails?.loanType.includes("FHA") ? "Yes" : "No"),
        LA6: () => (userDetails?.loanType.includes("USDA") ? "Yes" : "No"),
        LA7: () =>
          userDetails?.loanType.includes("Home Equity Line of Credit")
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
        NRC2: () => userDetails?.neighborhoodReviewDays




      };

      console.log("===", annotationsList, userDetails);
      annotationsList.forEach((annotation) => {
        if (
          annotation instanceof pdfInstance.Core.Annotations.WidgetAnnotation
        ) {
          const field = annotation.getField();
          console.log("truee", field.name);
          if (
            field &&
            Object.prototype.hasOwnProperty.call(fieldValueSetters, field.name)
          ) {
            //   console.log("truees");
            field.setValue(fieldValueSetters[field.name]());
            annotationManager.updateAnnotation(annotation);
            annotationManager.redrawAnnotation(annotation);
            isModified = true;
          }
        }
        console.log("jjjjj");
      });

      // if (isModified) {
      //   const xfdf = await annotationManager.exportAnnotations();
      //   const data = await documentViewer
      //     .getDocument()
      //     .getFileData({ xfdfString: xfdf });

      //   const blob = new Blob([new Uint8Array(data)], {
      //     type: "application/pdf",
      //   });
      //   const url = URL.createObjectURL(blob);
      //   const downloadLink = document.createElement("a");
      //   downloadLink.href = url;
      //   downloadLink.download = "UpdatedDocument.pdf";
      //   document.body.appendChild(downloadLink);
      //   //downloadLink.click();
      //   downloadLink.remove();
      //   URL.revokeObjectURL(url);
      // } else {
      //   console.log("No modifications made to the PDF");
      // }

      // if (webViewerInstance.current && webViewerInstance.current.Core.PDFNet) {
      //   //   const pdfDataString = await extractAllPdfDataAsString(
      //   //     webViewerInstance.current
      //   //   );
      // } else {
      //   console.error("PDFNet is not available or not initialized.");
      // }
    });
  };

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

  const handleGenerate = () => {
    userDetailsData && modifyPdf(pdfInstance, userDetailsData?.userDetails);
    if (webViewerInstance.current && pdfUrls[selectedPdfIndex]) {
      const { documentViewer } = webViewerInstance.current.Core;
      documentViewer.loadDocument(pdfUrls[selectedPdfIndex]);
    }
  };

  const pdfViewerContainerStyle = {
    padding: "120px 20px 20px 10px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const pdfSelectionContainerStyle = {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "20px",
    gap: "15px",
  };

  const pdfPreviewStyle = (index) => ({
    padding: "20px",
    cursor: "pointer",
    backgroundColor:
      selectedPdfIndex === index ? "rgba(255, 255, 255, 0.8);" : "white",
    marginRight: "10px",
    transition: "transform 0.2s ease-in-out",
    transform: selectedPdfIndex === index ? "scale(1.05)" : "scale(1)",
    boxShadow:
      selectedPdfIndex === index
        ? "0 6px 10px rgba(0, 0, 255, 0.2)"
        : "0 4px 8px rgba(0, 0, 255, 0.2)",
    width: "150px",
    height: "200px",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "14px",
  });

  const generateButtonStyle = {
    padding: "10px 20px",
    marginBottom: "20px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.2s ease",
  };

  const pdfDisplayStyle = {
    height: "500px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={pdfViewerContainerStyle}>
      <div style={pdfSelectionContainerStyle}>
        {pdfName.map((name, index) => (
          <div
            key={index}
            onClick={() => setSelectedPdfIndex(index)}
            style={pdfPreviewStyle(index)}
          >
            {name}.pdf
          </div>
        ))}
      </div>
      <button onClick={handleGenerate} style={generateButtonStyle}>
        Generate
      </button>
      <div id="pdfViewer" style={pdfDisplayStyle}></div>
    </div>
  );
}

export default PdfViewer;

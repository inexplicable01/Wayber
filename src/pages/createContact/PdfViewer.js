import React, { useState, useEffect, useRef } from "react";
import Styles from "../../../src/assets/scss/pages/_createClient.scss";
import { Button } from "reactstrap";
import Loader from "../../../src/Components/Common/Loader";
import usePdfViewer from "./hooks/usePdfViewer";
import { getFirebaseBackend } from "../../helpers/firebase_helper";
function PdfViewer() {
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
  const {
    modalContent,
    userDetailsData,
    handleTextSelection,
    GptTextUploader,
    pdfDataString,
    pdfName,
    handleGenerate,
    pdfInstance,
    uploadPdf,
    addSignatureField
  } = usePdfViewer(selectedPdfIndex);

  useEffect(() => {
    if (pdfInstance) {
      handleGenerate(selectedPdfIndex);
    }
  }, [pdfInstance, selectedPdfIndex]);


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
        <div style={{ display: "flex", gap: 20 }}>
          <Button onClick={handleTextSelection}>Upload Selected text</Button>
          <Button
            onClick={() => GptTextUploader(pdfDataString)}
            color="success"
          >
            Upload
          </Button>
        </div>
      )}
      <Button onClick={uploadPdf}>upload</Button>
      <Button onClick={addSignatureField}>addSignatureField</Button>
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

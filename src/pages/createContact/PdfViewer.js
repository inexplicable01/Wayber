import React, { useState, useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";
import PdfData from "../../assets/pdf/abc.pdf";

function PdfViewer() {
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
  const webViewerInstance = useRef(null);

  const pdfUrls = [
    PdfData,
    "path/to/your/second/pdf/document.pdf",
    "path/to/your/third/pdf/document.pdf",
  ];

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
      });
    }
  }, []);

  const handleGenerate = () => {
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
    gap:"15px"
  };

  const pdfPreviewStyle = (index) => ({
    
    padding: "20px",
    cursor: "pointer",
    // border: selectedPdfIndex === index ? "2px solid blue" : "2px solid gray",
    marginRight: "10px",
    transition: "transform 0.2s ease-in-out",
    transform: selectedPdfIndex === index ? "scale(1.05)" : "scale(1)",
    boxShadow: selectedPdfIndex === index ? "0 6px 10px rgba(0, 0, 255, 0.2)" : "0 4px 8px rgba(0, 0, 255, 0.2)",
    width:"150px",
    height:"200px",
    borderRadius:"6px"
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
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            onClick={() => setSelectedPdfIndex(index)}
            style={pdfPreviewStyle(index)}
          >
            PDF {index + 1}
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

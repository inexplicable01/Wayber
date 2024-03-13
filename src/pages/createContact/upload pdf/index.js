import React, { useState, useEffect } from "react";
import { Container, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadTextRequest } from "../../../store/createContact/actions";
import * as pdfjsLib from "pdfjs-dist/webpack.mjs";
import Loader from "../../../../src/Components/Common/Loader";

// Assuming Styles is being used somewhere else or remove if not used
import Styles from "../../../../src/assets/scss/pages/_createClient.scss";

const UploadPdf = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const userDetailsData = useSelector((state) => state.textUploadReducer);

  useEffect(() => {
    if (
      userDetailsData?.success &&
      modalContent === "" &&
      !userDetailsData?.loading
    ) {
      setLoading(false);
      setModalContent(userDetailsData?.data);
    } else if (userDetailsData?.error) {
      setLoading(false);
      setModalContent(userDetailsData?.error);
    }
  }, [userDetailsData]);

 
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setError(""); // Reset error message

      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        try {
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item) => item.str).join(" ");
          }

          if (text.length > 8120) {
            text = text.substring(0, 8129);
          }

          setExtractedText(text);
        } catch (error) {
          console.error("Error extracting text: ", error);
        }
      };
    } else {
      setError("Please select a PDF file to upload.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || extractedText.trim() === "") {
      setError(
        "Please select a file and ensure text is extracted before uploading."
      );
      return;
    }
    setLoading(true); // Start loading
    setError(""); // Reset error message
    const finalText = `${dropdownValue} ${extractedText}`;
    dispatch(uploadTextRequest(finalText));
  };

  console.log("modalContent",modalContent);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <form onSubmit={handleSubmit} className="form">
            <label className="label">
              Upload PDF:
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="uploadInputField"
              />
              {error && (
                <div style={{ color: "red", marginTop: "8px" }}>{error}</div>
              )}
            </label>
            <div>
              <select
                onChange={(e) => setDropdownValue(e.target.value)}
                value={dropdownValue}
                className="dropdownContainer"
              >
                <option value="">Select an Option</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </select>
            </div>
            <div>
              <Button type="submit" disabled={loading}>
                {userDetailsData.loading ? <Loader /> : "Upload PDF"}
              </Button>
            </div>
          </form>
        </Container>
        <div className="container">
          <div className="apiResponseContainerForUploadDoc">
            <p className="apiResponseHeading">API Response:</p>
            {userDetailsData?.loading ? (
              <Loader />
            ) : (
              <p>{modalContent ? modalContent : "Upload document"}</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadPdf;

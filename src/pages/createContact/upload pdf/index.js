import React, { useState, useEffect } from "react";
import { Container, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadTextRequest, clearModalContentAction } from "../../../store/createContact/actions";
import * as pdfjsLib from "pdfjs-dist/webpack";
import Loader from "../../../../src/Components/Common/Loader";

const UploadPdf = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { data, loading, success, error: userDetailsError } = useSelector(state => state.textUploadReducer);

  useEffect(() => {
    dispatch(clearModalContentAction());
  }, [dispatch]);

  useEffect(() => {
    if (success && !loading) {
      setModalContent(data);
    } else if (userDetailsError) {
      setModalContent(userDetailsError);
    }
  }, [data, loading, success, userDetailsError]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setError("");

      try {
        const typedArray = new Uint8Array(await file.arrayBuffer());
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(" ");
        }

        setExtractedText(text.slice(0, 8120));
      } catch (error) {
        console.error("Error extracting text: ", error);
        setError("Error extracting text from the PDF.");
      }
    } else {
      setError("Please select a PDF file to upload.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !extractedText.trim()) {
      setError("Please select a file and ensure text is extracted before uploading.");
      return;
    }

    dispatch(uploadTextRequest(`${dropdownValue} ${extractedText}`));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <form onSubmit={handleSubmit} className="form">
            <label className="label">
              Upload PDF:
              <input type="file" accept="application/pdf" onChange={handleFileChange} className="uploadInputField" />
              {error && <div style={{ color: "red", marginTop: "8px", fontSize: "13px" }}>{`*${error}`}</div>}
            </label>
            <div>
              <select onChange={(e) => setDropdownValue(e.target.value)} value={dropdownValue} className="dropdownContainer">
                <option value="">Select an Option</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </select>
            </div>
            <div>
              <Button type="submit" disabled={loading}>{loading ? <Loader /> : "Upload PDF"}</Button>
            </div>
          </form>
        </Container>
        <div className="container">
          <div className="apiResponseContainerForUploadDoc">
            <p className="apiResponseHeading">API Response:</p>
            {loading ? <Loader /> : <p>{modalContent || "Upload document"}</p>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadPdf;

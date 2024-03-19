import React, { useState, useEffect } from "react";
import { Container, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import * as pdfjsLib from "pdfjs-dist/webpack";
import Loader from "../../../../src/Components/Common/Loader";
import axios from "axios";

const UploadPdf = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [modalContent, setModalContent] = useState([]);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const {
    data,
    loading,
    success,
    error: userDetailsError,
  } = useSelector((state) => state.textUploadReducer);

  const APICall = async (chunkData) => {
    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: chunkData,
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
      setModalContent((prevContent) => [
        ...prevContent,
        response?.choices[0].message.content,
      ]);
      console.log(
        response?.choices[0].message.content,
        "response--------------------------------"
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (success && !loading) {
      setModalContent(data);
    } else if (userDetailsError) {
      setModalContent([userDetailsError]);
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
          text += content.items.map((item) => item.str).join(" ");
        }

        setExtractedText(text);
      } catch (error) {
        console.error("Error extracting text: ", error);
        setError("Error extracting text from the PDF.");
      }
    } else {
      setError("Please select a PDF file to upload.");
    }
  };
  const CHUNK_SIZE = 8120;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !extractedText.trim()) {
      setError(
        "Please select a file and ensure text is extracted before uploading."
      );
      return;
    }

    const numberOfChunks = Math.ceil(extractedText.length / CHUNK_SIZE);
    for (let i = 0; i < numberOfChunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = start + CHUNK_SIZE;
      const chunk = extractedText.slice(start, end);
      const chunkData = `Chunk ${i + 1} of ${numberOfChunks}: ${chunk}`;
      APICall(chunkData);
    }
  };

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
                <div
                  style={{ color: "red", marginTop: "8px", fontSize: "13px" }}
                >{`*${error}`}</div>
              )}
            </label>
            <div>
              <select
                onChange={(e) => setDropdownValue(e.target.value)}
                value={dropdownValue}
                className="dropdownContainer"
              >
                <option value="">Select an Option</option>
                <option value="Option 1">Get 5 serious concern from our doc.</option>
                <option value="Option 2">Get me the summery of this doc.</option>
              </select>
            </div>
            <div>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader /> : "Upload PDF"}
              </Button>
            </div>
          </form>
        </Container>
        <div className="container">
          <div className="apiResponseContainerForUploadDoc">
            <p className="apiResponseHeading">API Response:</p>
            {loading ? (
              <Loader />
            ) : (
              <p>
                {modalContent.map((content, index) => (
                  <p key={index}>{`Chunk ${index + 1}: ${content}`}</p>
                )) || "Upload document"}
              </p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadPdf;

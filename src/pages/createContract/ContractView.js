import React, {useEffect, useState, useRef} from "react";
import {useFormik} from "formik";
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

import PdfData from "../../assets/pdf/abc.pdf";
import WebViewer from "@pdftron/webviewer";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import OpenAIResponse from "./Model";
import Loader from "../../Components/Common/Loader";

const myDate = new Date("2024-02-01");
const ContractView = ({onSubmit}) => {
    const webViewerInstance = useRef(null);
    const [pdfInstance, setPdfInstance] = useState(null);
    const [documentLoaded, setDocumentLoaded] = useState(false);
    const [zpidDeatils, setZpidDetails] = useState();
    const userZPIDdetails = useSelector((state) => state.clientProfileReducer.userZPID.details);
    const [uploadDocument, setUploadDocument] = useState(false);
    const [pdfDataString, setPDFDataString] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    // const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!webViewerInstance.current) {
            WebViewer(
                {
                    path: "/webviewer/lib",
                    initialDoc: PdfData,
                    licenseKey: process.env.REACT_APP_PDFTRON_LICENSEKEY,
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
    const modifyPdfAnnotations = async (pdfInstance, userDetails) => {
        const {documentViewer, annotationManager} = pdfInstance.Core;

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
            PI_City: () => userZPIDdetails?.address?.city,
            PI_State: () => userZPIDdetails?.address?.state,
            PI_Zip: () => userZPIDdetails?.address?.zipcode,
            PI_County: () => userZPIDdetails?.country,
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
                // setDisplayPDF(true);
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
                .getFileData({xfdfString: xfdf});

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


    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    const modifyPdf = async (pdfInstance, userDetails) => {
        // console.log(userDetails?.zpidDeatils?.address,"jnjkjjbkjbjbubjkbjbjbjbj");
        const {documentViewer, annotationManager} = pdfInstance.Core;

        if (documentViewer.getDocument()) {
            await modifyPdfAnnotations(pdfInstance, userDetails);
        } else {
            documentViewer.addEventListener("documentLoaded", async () => {
                await modifyPdfAnnotations(pdfInstance, userDetails);
            });
        }
    };
    const extractAllPdfDataAsString = async (pdfInstance) => {
        const {
            Core: {PDFNet},
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
    const toggleModal = () => setModalOpen(!modalOpen);
    const [loading, setLoading] = useState(false);
    const [extractedData, setExtractedData] = useState("");
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
            Core: {PDFNet},
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
            <div
                className={"display_block"}
                id="your-webviewer-container-id"
                style={{height: "100dvh"}}
            ></div>
            {uploadDocument &&

                <div className="uploadButtonsContainer">
                    {loading ? <div className="loaderContainer"><Loader/></div> : <>
                        <Button
                            onClick={() => GptTextUploader(pdfDataString)}
                            color="success"
                        >
                            Upload
                        </Button>
                        <Button onClick={handleTextSelection}>
                            Upload selected text
                        </Button>
                    </>}

                </div>
            }

            <OpenAIResponse
                isOpen={modalOpen}
                toggle={toggleModal}
                title="API Response"
                content={modalContent}
                setUploadDocument={setUploadDocument}
            />
        </React.Fragment>
    );
};

export default ContractView;
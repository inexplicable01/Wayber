import React from 'react';
import {useRef, useEffect, useState} from 'react';
import WebViewer from '@pdftron/webviewer';

import {useProfile} from "../../Components/Hooks/UserHooks";
import {Col, Container, Row} from "reactstrap";
import {useSelector, useDispatch} from 'react-redux';
import * as actions from './../../store/quotes/actions';
import * as pdfactions from './../../store/PDFs/actions';
import * as projectgroupactions from './../../store/projectgroup/actions';
import {documentnames} from "../../config";
import {saveAnnotationRequest} from "./../../store/quotes/actions";
import {useParams} from "react-router-dom";
import {getFirebaseBackend} from "../../helpers/firebase_helper";
import ProjectDetailCard from "../ProjectGroups/ProjectDetailCard";
import projectgroupreducer from "../../store/projectgroup/reducer";
// import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';
import RealEstateBotAIDiscussion from "../RealEstateAIBot/RealEstateBotAIDiscussion";

const PDFViewerComponent = () => {
    const viewer = useRef(null);
    const [document, setDocument] = useState(documentnames.FORM21)
    const [pdftext, setPdftext] = useState('')

    const {userProfile} = useProfile()

    const dispatch = useDispatch();


    function loadDocumentInViewer(url) {
        if (viewer.current && viewer.current.instance) {
            const {documentViewer} = viewer.current.instance.Core;
            documentViewer.loadDocument(url);
        }
    }


// eslint-disable-next-line
    useEffect(() => {

            if (viewer.current && !viewer.current.instance) {
                WebViewer({
                    fullAPI: true,
                    path: '/webviewer/lib',
                    licenseKey: process.env.PDFTRON_LICENSEKEY,
                    initialDoc: `./NWMLS_Forms/${document}`,
                }, viewer.current,).then((instance) => {
                        viewer.current.instance = instance;
                        // Once the instance is ready, you can access the documentViewer and annotationManager
                        const {
                            PDFNet,
                            Tools,
                            documentViewer,
                            annotationManager,
                            // annotManager,
                            Annotations
                        } = instance.Core;
                        if (userProfile) {
                            annotationManager.setCurrentUser(userProfile.first_name);
                        }
                        const roleColors = {
                            selleragent: new Annotations.Color(255, 0, 0), // Red
                            buyer: new Annotations.Color(0, 255, 0), // Green
                            buyeragent: new Annotations.Color(0, 0, 255), // Blue
                            // ... other roles
                        };
                        // Add event listener for when the document is loaded
                        documentViewer.addEventListener('documentLoaded', async () => {
                            // const doc = documentViewer.getDocument();
                            // const pageCount = doc.getPageCount();
                            //
                            // let fullText = '';
                            // for (let i = 1; i <= pageCount; i++) {
                            //     const pageText = await doc.loadPageText(i);
                            //     fullText += pageText + "\n"; // Append text of each page
                            // }
                            await PDFNet.initialize();
                            const doc = await documentViewer.getDocument().getPDFDoc();
                            const firstPage = await doc.getPage(1);

                            const txt = await PDFNet.TextExtractor.create();
                            const rect = new PDFNet.Rect(0, 0, 612, 794);
                            txt.begin(firstPage, rect); // Read the page.

                            // Extract words one by one.
                            let fullText = "";
                            let line = await txt.getFirstLine();
                            let word;
                            for (; (await line.isValid()); line = (await line.getNextLine())) {
                                for (word = await line.getFirstWord(); (await word.isValid()); word = (await word.getNextWord())) {
                                    const wstring = await word.getString();
                                    if (wstring) {
                                        // console.log("Extracted word:", wstring);
                                        fullText += wstring + " ";
                                    } else {
                                        // console.log("No string returned for word:", word);
                                    }
                                    // console.log(wstring)
                                }
                                // console.log(line.toString())
                                fullText += "\n"; // Option
                            }
                            // console.log("Full extracted text:", fullText);
                            setPdftext(fullText)
                        });
                        annotationManager.addEventListener('annotationChanged', (annotations, action, {imported}) => {
                            console.log('how about here')
                            // widgets and links will remain in the document without changing so it isn't necessary to export them
                            if (action === 'add' && !imported && userProfile) {
                                annotations.forEach(annotation => {
                                    // console.log(userProfile.role)
                                    const color = roleColors[userProfile.role];
                                    // console.log(userProfile.role, color)
                                    if (color) {
                                        if (annotation.StrokeColor) {
                                            annotation.StrokeColor = color;
                                        }
                                        if (annotation.TextColor) {
                                            annotation.TextColor = color;
                                        }
                                        // Set other color properties as needed based on annotation type

                                        annotationManager.redrawAnnotation(annotation);
                                    }
                                });
                            }
                            if (action === 'add') {
                                annotations.forEach(annotation => {
                                    if (annotation instanceof Annotations.RectangleAnnotation) {
                                        // Extract text within the annotation bounds
                                        // extractTextFromAnnotation(annotation);
                                    }
                                });
                            }
                        })
                        const extractTextFromAnnotation = async (annotation) => {
                            // const page = docViewer.getDocument().getPage(annotation.PageNumber);
                            console.log('annonation', annotation)
                            // const quads = annotation.getQuads();
                            const doc = await documentViewer.getDocument().getPDFDoc();
                            const annots = await annotationManager.exportAnnotations();
                            await PDFNet.runWithCleanup(async () => {

                                // lock the document before a write operation
                                // runWithCleanup will auto unlock when complete
                                doc.lock();

                                // import annotations to PDFNet
                                const fdf_doc = await PDFNet.FDFDoc.createFromXFDF(annots);
                                await doc.fdfUpdate(fdf_doc);

                                const page = await doc.getPage(1);
                                const rect = await page.getCropBox();
                                // const annotation = await page.getAnnot(0);
                                const te = await PDFNet.TextExtractor.create();
                                te.begin(page, rect);
                                const textData = await te.getTextUnderAnnot(annotation);
                                console.log('plplpl', textData);
                            });
                        };
                        instance.UI.setHeaderItems(header => {
                            header.push({
                                type: 'actionButton',
                                // img: 'https://via.placeholder.com/32',
                                img: '...',
                                onClick: async () => {
                                    const doc = documentViewer.getDocument();
                                    const xfdfString = await annotationManager.exportAnnotations();
                                    const data = await doc.getFileData({
                                        // saves the document with annotations in it
                                        xfdfString
                                    });
                                    const arr = new Uint8Array(data);
                                    const blob = new Blob([arr], {type: 'application/pdf'});

                                    // uploaddoc(blob)
                                }
                            });
                        });

                        let lastRectangle = null;
                        instance.UI.setHeaderItems(header => {
                            header.push({
                                type: 'actionButton',
                                img: 'https://via.placeholder.com/32',
                                // img: '...',
                                onClick: () => {
                                    console.log('hi!!!')

                                    if (lastRectangle) {
                                        console.log('delete!!!')
                                        documentViewer.getAnnotationManager().deleteAnnotation(lastRectangle);
                                    }
                                    const rectTool = new Tools.RectangleCreateTool(documentViewer);
                                    documentViewer.setToolMode(rectTool);

                                    const onAnnotationAdded = (annotations, action, {imported}) => {
                                        if (action === 'add' && !imported) {
                                            const addedAnnotation = annotations[0];
                                            if (addedAnnotation instanceof Annotations.RectangleAnnotation) {
                                                const newRectangle = annotations.find(ann => ann instanceof Annotations.RectangleAnnotation && ann !== lastRectangle);
                                                if (newRectangle) {
                                                    lastRectangle = newRectangle;
                                                }
                                                // Switch back to the default tool mode
                                                documentViewer.setToolMode(documentViewer.getTool('Pan'));
                                                annotationManager.removeEventListener('annotationChanged', onAnnotationAdded);
                                            }
                                        }
                                    };

                                    annotationManager.addEventListener('annotationChanged', onAnnotationAdded);


                                    // documentViewer.getAnnotationManager().addEventListener('annotationChanged', (annotations, action) => {
                                    //     if (action === 'add') {
                                    //         if (lastRectangle) {
                                    //             console.log('delete!!!')
                                    //             documentViewer.getAnnotationManager().deleteAnnotation(lastRectangle);
                                    //         }
                                    //         // Find the newly added rectangle and store it
                                    //         const newRectangle = annotations.find(ann => ann instanceof Annotations.RectangleAnnotation && ann !== lastRectangle);
                                    //         if (newRectangle) {
                                    //             lastRectangle = newRectangle;
                                    //         }
                                    //     }
                                    // }, {once: true});
                                }
                            });
                        });
                        instance.UI.setHeaderItems(header => {
                            header.push({
                                type: 'actionButton',
                                img: 'https://via.placeholder.com/32',
                                // img: '...',
                                onClick: async () => {
                                    await PDFNet.initialize();
                                    const doc = await documentViewer.getDocument().getPDFDoc();
                                    const annots = await annotationManager.exportAnnotations();
                                    await PDFNet.runWithCleanup(async () => {

                                        //     // lock the document before a write operation
                                        //     // runWithCleanup will auto unlock when complete
                                        doc.lock();
                                        console.log(lastRectangle)
                                        // const fdf_doc = await PDFNet.FDFDoc.createFromXFDF(annots);
                                        // await doc.fdfUpdate(fdf_doc);

const page = await doc.getPage(1);
const {x1, y1, x2, y2} = lastRectangle.getRect(); // Adjust these properties to match your lastRectangle object
const rect = await PDFNet.Rect.init(x1, y1, x2, y2);

// Create a TextExtractor
const txt = await PDFNet.TextExtractor.create();
await txt.begin(page, rect); // Start the extractor for the specific area

// Extract the text
const textData = await txt.getAsText();

// Do something with the extracted text
                                        console.log(textData);
                                        //
                                        //     // import annotations to PDFNet
                                        //     const fdf_doc = await PDFNet.FDFDoc.createFromXFDF(annots);
                                        //     await doc.fdfUpdate(fdf_doc);
                                        //
//                                         const page = await doc.getPage(1);
//                                         //     const rect = await page.getCropBox();
//                                         //     const annotation = await page.getAnnot(0);
//                                         const {x1, y1, x2, y2} = lastRectangle.getRect();
//
// // Create a new PDFNet.Rect object with these dimensions
//                                         const rect = await PDFNet.Rect.init(x1, y1, x2, y2);
//                                         const te = await PDFNet.TextExtractor.create();
//                                         te.begin(page, rect);
//
//                                         let pdfNetAnnot;
//                                         const annotations = annotationManager.getAnnotationsList();
//                                         for (let annot of annotations) {
//                                             if (annot.equals(lastRectangle)) {
//                                                 pdfNetAnnot = annot.getPDFNetAnnot();
//                                                 break;
//                                             }
//                                         }
//                                         if (pdfNetAnnot) {
//                                             te.begin(page, pdfNetAnnot.getRect());
//                                             const textData = await te.getTextUnderAnnot(pdfNetAnnot);
//                                             setPdftext(textData);
//                                         } else {
//                                             console.error('Corresponding PDFNet.Annot not found for the given rectangle annotation.');
//                                         }
                                    });
                                }
                            });
                        });

                        // checkFirebaseAndLoadDocument();


                    }
                )
            } else if (viewer.current && viewer.current.instance) {
                console.log('hereher?')
                // viewer.current.instance.Core.documentViewer.loadDocument(`./NWMLS_Forms/${document}`);
                // if (typeof viewer.current.instance.loadDocument === 'function') {
                //     viewer.current.instance.Core.documentViewer.loadDocument(`./NWMLS_Forms/${document}`);
                // } else {
                //     console.error('loadDocument function is not available on the instance');
                // }
            }
        }
        ,
        [dispatch, document]
    )


    return (

        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="MyComponent">
                        <h1>{document}</h1>
                        <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
                    </div>
                    <h1>Selected Text</h1>
                    <p>{pdftext}</p>
                    <RealEstateBotAIDiscussion pdftext={pdftext}/>
                </Container>


            </div>
        </React.Fragment>

    );
}

export default PDFViewerComponent;


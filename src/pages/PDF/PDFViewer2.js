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
import RealEstateBotAIDiscussion from "../RealEstateAIBot/RealEstateBotAIDiscussion";
// import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';

const PDFViewerComponent = () => {
    const viewer = useRef(null);
    const [document, setDocument] = useState(documentnames.FORM21)
    const {projectGroupID, form} = useParams();
    const [anno, setAnno] = useState(null)
    const {userProfile} = useProfile()
    console.log('document', document)
    const xfdfString = useSelector(state => state.quoteReducer.xfdfString);
    const projectGroup = useSelector(state => state.projectgroupreducer.projectGroup);
    const dispatch = useDispatch();

    function loadDocumentInViewer(url) {
        if (viewer.current && viewer.current.instance) {
            const {documentViewer} = viewer.current.instance.Core;
            documentViewer.loadDocument(url);
        }
    }


// eslint-disable-next-line
    useEffect(() => {
        const currentViewer = viewer.current;
            const uploaddoc = (blob) => {
                if (userProfile) {
                    console.log('Uploading PDF')
                    dispatch(pdfactions.uploadPdfRequest(projectGroupID, blob, document));
                }
            }
            const firebasebackend = getFirebaseBackend()
            const checkFirebaseAndLoadDocument = () => {

                if (userProfile) {
                    const userFilePath = `${projectGroupID}/${form}`;
                    // const userFilePath = filepath; // Path to user-specific file
                    const templateFilePath = `admin/${form}`; // Path to template file

                    firebasebackend.getFileUrl(userFilePath)
                        .then(loadDocumentInViewer)
                        .catch(() => {
                            // User-specific file not found, try loading the template file
                            firebasebackend.getFileUrl(templateFilePath)
                                .then(loadDocumentInViewer)
                                .catch(error => {
                                    // Neither file found, handle error
                                    console.error("Error loading document:", error);
                                });
                        });
                }
            }
            if (viewer.current && !viewer.current.instance) {
                WebViewer({
                    path: '/webviewer/lib',
                    licenseKey: process.env.PDFTRON_LICENSEKEY,
                }, viewer.current,).then((instance) => {
                        viewer.current.instance = instance;
                        // Once the instance is ready, you can access the documentViewer and annotationManager
                        const {Tools, docViewer, documentViewer, annotationManager, annotManager, Annotations} = instance.Core;
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
                            const doc = documentViewer.getDocument();
                            const pageCount = doc.getPageCount();

                            let fullText = '';
                            for (let i = 1; i <= pageCount; i++) {
                                const pageText = await doc.loadPageText(i);
                                fullText += pageText + "\n"; // Append text of each page
                            }

                            console.log("Full document text:", fullText);
                            // setPdftext(fullText)
                            // // Now you can use `fullText` for further processing or analysis
                        });
                        annotationManager.addEventListener('annotationChanged', (annotations, action, {imported}) => {
                            console.log('how about here')
                            // widgets and links will remain in the document without changing so it isn't necessary to export them
                            annotationManager.exportAnnotations({links: false, widgets: false}).then(xfdfString => {
                                setAnno(xfdfString);
                                // Full samples are available at the end of this section.
                            });
                            console.log('annotationChanged')
                            if (action === 'add' && !imported) {
                                annotations.forEach(annotation => {
                                    console.log(userProfile.role)
                                    const color = roleColors[userProfile.role];
                                    console.log(userProfile.role, color)
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
                                        extractTextFromAnnotation(annotation);
                                    }
                                });
                            }
                        })

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

                                    uploaddoc(blob)
                                }
                            });
                        });
                        const extractTextFromAnnotation = async (annotation) => {
                            // const page = docViewer.getDocument().getPage(annotation.PageNumber);
                            console.log('annonation', annotation)
                            // const quads = annotation.getQuads();

                            // Convert annotation quads to page coordinates
                            // const textQuads = quads.map(quad => console.log(quad));

                            // Extract text using the quads
                            // const extractedText = await page.getText(textQuads);
                            // console.log(extractedText);
                        };
                        instance.UI.setHeaderItems(header => {
                            header.push({
                                type: 'actionButton',
                                img: 'https://via.placeholder.com/32',
                                // img: '...',
                                onClick: () => {
                                    const rectTool = new Tools.RectangleCreateTool(docViewer);
                                    docViewer.setToolMode(rectTool);
                                }
                            });
                        });


                        checkFirebaseAndLoadDocument();


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
        [document, dispatch, userProfile,projectGroupID]//, F, projectGroupID]
    )


    useEffect(() => {
        dispatch(projectgroupactions.readProjectGroupByID(projectGroupID))
    }, [projectGroupID, dispatch])
    const handleDocumentChange = (e) => {
        setDocument(e.target.value);
    }

// Function to save annotations to your backend or Firebase

    const saveAnnotations = () => {
        // Replace with your actual logic to save the annotations
        console.log('Saving annotations', userProfile);
        // e.g., send xfdfString to your backend or Firebase
        if (userProfile) {
            // console.log('hi')
            // saveAnnotationRequest = (uid, annotationData, formName)
            dispatch(actions.saveAnnotationRequest(userProfile.uid, anno, document));
            setNewQuote('');
        }

    };

    useEffect(() => {
        dispatch(actions.fetchQuotesRequest());
    }, [dispatch]);

// const now = new Date();
// const seattleTime = new Date(now.getTime() - (8 * 60 * 60 * 1000));
// const timestr = seattleTime.toISOString().replace('T', ' ').substring(0, 19);
    const [newQuote, setNewQuote] = useState('');
    const handleAddQuote = (e) => {
        e.preventDefault();
        if (newQuote && userProfile.uid) {
            dispatch(actions.addQuoteRequest(newQuote, userProfile.uid));
            setNewQuote('');
        }
    };

    return (

        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="MyComponent">
                        {/*<h1>{projectGroupID}</h1>*/}
                        <h1>{form}</h1>
                        {projectGroup ? (<ProjectDetailCard projectGroup={projectGroup}/>) : <h2>k</h2>}
                        <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
                    </div>
                    <RealEstateBotAIDiscussion/>
                </Container>
            </div>
        </React.Fragment>

    );
}

export default PDFViewerComponent;


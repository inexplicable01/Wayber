import React from 'react';
import {useRef, useEffect, useState} from 'react';
import WebViewer from '@pdftron/webviewer';

import {useProfile} from "../../Components/Hooks/UserHooks";
import {Col, Container, Row} from "reactstrap";
import {useSelector, useDispatch} from 'react-redux';
import * as actions from './../../store/quotes/actions';
import * as pdfactions from './../../store/PDFs/actions';
import {documentnames} from "../../config";
import {saveAnnotationRequest} from "./../../store/quotes/actions";
import {getFirebaseBackend} from "./../../helpers/firebase_helper"

const PDFViewerComponent = () => {
    const viewer = useRef(null);
    const [document, setDocument] = useState(documentnames.FORM21)
    // const userUID = useSelector(state => state.Profile.uid);
    // const userUID='blah'
    const [anno, setAnno] = useState(null)
    const {userProfile} = useProfile()
    // console.log(userProfile)
    const xfdfString = useSelector(state => state.quoteReducer.xfdfString);
    const dispatch = useDispatch();


    function loadDocumentInViewer(url) {
        if (viewer.current && viewer.current.instance) {
            const {documentViewer} = viewer.current.instance.Core;
            documentViewer.loadDocument(url);
        }
    }


    // getFirebaseBackend
// eslint-disable-next-line
    useEffect(() => {
         const firebasebackend = getFirebaseBackend()
            const checkFirebaseAndLoadDocument = () => {

                if (userProfile) {
                    const userFilePath = `${userProfile.uid}/${document}`;
                    // const userFilePath = filepath; // Path to user-specific file
                    const templateFilePath = `admin/${document}`; // Path to template file

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
            const uploaddoc = (blob) => {
                if (userProfile) {
                    // console.log('hi')
                    dispatch(pdfactions.uploadPdfRequest(userProfile.uid, blob, document));
                }
            }
            // console.log('use effected')
            if (viewer.current && !viewer.current.instance) {
                WebViewer({
                    path: '/webviewer/lib',
                    licenseKey: process.env.PDFTRON_LICENSEKEY,
                    // initialDoc: `./NWMLS_Forms/${document}`,
                }, viewer.current,).then((instance) => {
                    viewer.current.instance = instance;
                    // Once the instance is ready, you can access the documentViewer and annotationManager
                    const {documentViewer, annotationManager, annotManager, Annotations} = instance.Core;
                    // Add event listener for when the document is loaded
                    documentViewer.addEventListener('documentLoaded', async () => {
                        // const documentId = documentViewer.getDocument().getDocumentId();
                        if (userProfile) {
                            dispatch(actions.fetchAnnotationsRequest(document, userProfile.uid));
                        }
                    });
                    annotationManager.addEventListener('annotationChanged', () => {
                        console.log('how about here')
                        // widgets and links will remain in the document without changing so it isn't necessary to export them
                        annotationManager.exportAnnotations({links: false, widgets: false}).then(xfdfString => {
                            setAnno(xfdfString);
                            // Full samples are available at the end of this section.
                        });
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

                    checkFirebaseAndLoadDocument();
                })
            } else if (viewer.current && viewer.current.instance) {
                console.log('hereher?')
                // viewer.current.instance.Core.documentViewer.loadDocument(`./NWMLS_Forms/${document}`);
                // if (typeof viewer.current.instance.loadDocument === 'function') {
                //     viewer.current.instance.Core.documentViewer.loadDocument(`./NWMLS_Forms/${document}`);
                // } else {
                //     console.error('loadDocument function is not available on the instance');
                // }
            }

            if (viewer.current && viewer.current.instance && xfdfString) {
                const {annotationManager} = viewer.current.instance.Core;

                annotationManager.importAnnotations(xfdfString).then(() => {
                    console.log("Annotations imported successfully.");
                }).catch(error => {
                    console.error("Error importing annotations:", error);
                });
            }
        }
        ,
        [document, xfdfString, dispatch, userProfile]
    )
    ; // Re-run effect when 'document' state changes
    // function loadDocumentInViewer(url) {
    //     if (viewer.current && viewer.current.instance) {
    //         const {documentViewer} = viewer.current.instance.Core;
    //         documentViewer.loadDocument(url);
    //     }
    // }

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

// console.log('userUID', userUID)
    return (

        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="MyComponent">
                        <div>
                            <form onSubmit={handleAddQuote}>
                                <input
                                    type="text"
                                    value={newQuote}
                                    onChange={e => setNewQuote(e.target.value)}
                                    // defaultValue="4"
                                />
                                <button type="submit">Add Quote</button>
                            </form>
                            <ul>
                                {/*/!*{quotes}*!/*/}
                                {/*{quotes && quotes.map((quote, index) => (*/}
                                {/*    <li key={index}>{quote.text}</li>*/}
                                {/*))}*/}
                            </ul>
                        </div>
                        <div className="header">React sample</div>
                        <button onClick={saveAnnotations} disabled={!anno}> Save Annotations</button>
                        {/*<button onClick={uploaddoc}> Save uploaddoc</button>*/}
                        <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
                    </div>
                </Container>
            </div>
        </React.Fragment>

    );
}

export default PDFViewerComponent;


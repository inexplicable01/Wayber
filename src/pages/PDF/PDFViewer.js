import React from 'react';
import {RenderPage, RenderPageProps, Viewer} from '@react-pdf-viewer/core';
// Import the styles

import {useRef, useEffect, useState} from 'react';
// import { Worker , Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
import WebViewer from '@pdftron/webviewer';

// pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
import {Worker} from '@react-pdf-viewer/core';
import {Col, Container, Row} from "reactstrap";

// import {Document, Page, pdfjs} from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc="//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js"

const PDFViewerComponent = () => {
    const viewer = useRef(null);
    const [document, setDocument] = useState('21_ResidentialPSA.pdf')


    // useEffect(() => {
    //     console.log('use effected')
    //     WebViewer(
    //         {
    //             path: '/webviewer',
    //             licenseKey: 'demo:1702961812846:7c8f70290300000000faec49c74ef715a105f1c24fb3356e71a3af3d6e',
    //             initialDoc: `./NWMLS_Forms/${document}`,
    //         },
    //         viewer.current,
    //     ).then((instance) => {
    //         const {documentViewer} = instance.Core;
    //         console.log(documentViewer)
    //         // you can now call WebViewer APIs here...
    //     });
    // }, [document]);


    useEffect(() => {
        console.log('use effected')
        if (viewer.current && !viewer.current.instance) {
            WebViewer(
                {
                    path: '/webviewer',
                    licenseKey: 'demo:1702961812846:7c8f70290300000000faec49c74ef715a105f1c24fb3356e71a3af3d6e',
                    initialDoc: `./NWMLS_Forms/${document}`,
                },
                viewer.current,
            ).then((instance) => {
                viewer.current.instance = instance;
            });
        } else if (viewer.current && viewer.current.instance) {
            viewer.current.instance.loadDocument(`./NWMLS_Forms/${document}`);
        }
    }, [document]); // Re-run effect when 'document' state changes

    const handleDocumentChange = (e) => {
        setDocument(e.target.value);
    }


    return (

        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div className="MyComponent">

                        <div className="header">React sample</div>
                        <select onChange={handleDocumentChange} value={document}>
                            <option value="21_ResidentialPSA.pdf">Form 1</option>
                            <option value="22A_Financing.pdf">Form 2</option>
                            <option value="22AC_LoanLenderChange.pdf">Form 3</option>
                            <option value="22AD_IncreasedDownPayment.pdf">Form 4</option>
                        </select>
                        <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
                    </div>
                </Container>
            </div>
        </React.Fragment>

    );
}

export default PDFViewerComponent;


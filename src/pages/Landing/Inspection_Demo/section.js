// import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "reactstrap";
// import '../../../../src/assets/css/waves.css';
// import '../../../../src/assets/css/style.css';
//Importing Modal
// import ModalSection from "./ModalSection";
import contract1 from '../../../../src/assets/images/contractor/132377df7dcf13c4adea001d53e53fa3929b4bef_130x130_crop.jpg';
import contract2 from '../../../../src/assets/images/contractor/edd7cba6ae077972294a0bcdd6785fe75ea4e4e1_130x130_crop.jpg';
import contract3 from '../../../../src/assets/images/contractor/ffcd39d0af8aba52d063793629255a0372d69c21_130x130_crop.jpg';
import React, {useState, useEffect, useRef} from 'react';
import * as pdfactions from "../../../store/PDFs/actions";
import WebViewer from "@pdftron/webviewer";
import * as actions from "../../../store/quotes/actions";
import {inspectiondocs} from "../../../config";
import './Inspection_demo.css';
import ContractorCard from "./ContractorCard";
// import { Link } from 'react-router-dom';
const Section = () => {
    const [isOpen, setIsOpen] = useState(false);
    const viewer = useRef(null);
    const callModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [document, setDocument] = useState(inspectiondocs.woodmere98)
    // Example useEffect usage
    useEffect(() => {
        // This code runs after the component is mounted and after every update.
        // Place your side effect logic here. For example:
        console.log('Component did mount or update');

        // If you need to mimic componentWillUnmount,
        // you can return a function from here:
        return () => {
            console.log('Component will unmount or before update');
            // Place cleanup logic here if needed.
        };
    }, []); // Empty dependency array means this effect runs once after the initial render.
    useEffect(() => {

            if (viewer.current && !viewer.current.instance) {
                WebViewer({
                    path: '/webviewer/lib',
                    licenseKey: process.env.REACT_APP_PDFTRON_LICENSEKEY,
                    initialDoc: `./InspectionReports/${document}`,
                }, viewer.current,).then((instance) => {
                    viewer.current.instance = instance;
                    // Once the instance is ready, you can access the documentViewer and annotationManager
                    const {documentViewer, annotationManager, annotManager, Annotations} = instance.Core;
                    // Add event listener for when the document is loaded
                    documentViewer.addEventListener('documentLoaded', async () => {
                        // const documentId = documentViewer.getDocument().getDocumentId();
                    });
                    annotationManager.addEventListener('annotationChanged', () => {
                        // console.log('how about here')
                        // widgets and links will remain in the document without changing so it isn't necessary to export them
                        annotationManager.exportAnnotations({links: false, widgets: false}).then(xfdfString => {
                            console.log(xfdfString);
                            // Full samples are available at the end of this section.
                        });
                    })

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

            if (viewer.current && viewer.current.instance) {
                const {annotationManager} = viewer.current.instance.Core;
            }
        }
        ,
        [document]
    )
    ; // Re-run effect when 'document' state changes
  const contractor = {
    index: 1,
    name: 'Best Way Construction',
    category: 'Roofing Contractors, Home Builders, Building Contractors-Commercial & Industrial',
    phone: '(206) 783-3639',
    area: '98105',
    yearsInBusiness: 34,
    imageUrl: contract1, // Replace with actual path to image
     streetaddress:  '903NW 50th St',
      cityaddress:  'Seattle, WA98107'
  };
    const contractor2 = {
    index: 1,
    name: 'Pete and Pete Plumber',
    category: 'Indoor, Outdoor Plumbing, Sewage Line Install, Heating',
    phone: '(206) 556-9841',
    area: '98105',
    yearsInBusiness: 10,
    imageUrl: contract2, // Replace with actual path to image
             streetaddress:  '4819 Phinney Ave',
      cityaddress:  'Seattle, WA98105'
  };
      const contractor3 = {
    index: 1,
    name: 'Special Foundation LLC',
    category: 'Ranch Foundation, Duplex, Concrete, Crawl Space',
    phone: '(409) 888-4723',
    area: '98105',
    yearsInBusiness: 25,
    imageUrl: contract3, // Replace with actual path to image
               streetaddress:  '203 LakeWood Dr',
      cityaddress:  'Seattle, WA98103'
  };
    return (
        <React.Fragment>
            <section className="section bg-home " id="home">
                <div className="bg-overlay"></div>
                <div className="display-table ">
                    <div className="display-table-cell ">
                        <Container>
                            <Row>
                                <Col lg={{size: 5, offset: 0}} className="text-white text-center">
                                    <h1>Inspection Report</h1>
                                    <div className="webviewer" ref={viewer} style={{height: "60vh"}}></div>
                                    {/*<p className="play-shadow mt-4">*/}
                                    {/*    <Link to="#" onClick={callModal} className="play-btn video-play-icon">*/}
                                    {/*        <i className="mdi mdi-play text-center"></i>*/}
                                    {/*    </Link>*/}
                                    {/*</p>*/}
                                </Col>
                                <Col lg={{size: 7}} className="text-white text-center">
                                    <h1 className="home-title">Main Points from the report</h1>
                                    <div className="main-point">

                                        <ul className="custom-bullet-list">
                                            <li>
                                                <strong>Roofing: Leaks in multiple areas</strong>
                                                <p>Upon inspection, it was observed that there are several areas of the
                                                    roof where leaks are present. A specialist is recommended to
                                                    determine the full extent of the repairs needed.</p>
                                            </li>
                                            <li>
                                                <strong>Plumbing: Some Evidence of Drain Leak</strong>
                                                <p>The plumbing system has shown evidence of leaks in various locations,
                                                    including under sinks, at pipe joints, and in the vicinity of
                                                    appliance connections. </p>
                                            </li>
                                            <li>
                                                <strong>Foundation Suspect: Small Cracks</strong>
                                                <p>There are indications of cracks in several areas around the
                                                    foundation. These could be signs of structural weaknesses, poor
                                                    drainage, or cracks in the foundation itself. </p>
                                            </li>
                                        </ul>

                                    </div>
                                    {/*<p className="play-shadow mt-4">*/}
                                    {/*    <Link to="#" onClick={callModal} className="play-btn video-play-icon">*/}
                                    {/*        <i className="mdi mdi-play text-center"></i>*/}
                                    {/*    </Link>*/}
                                    {/*</p>*/}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-white text-center">
                                    <ContractorCard
                                        index={contractor.index}
                                        name={contractor.name}
                                        category={contractor.category}
                                        phone={contractor.phone}
                                        area={contractor.area}
                                        yearsInBusiness={contractor.yearsInBusiness}
                                        imageUrl={contractor.imageUrl}
                                        streetaddress={contractor.streetaddress}
                                        cityaddress={contractor.cityaddress}
                                    />
                                                                        <ContractorCard
                                        index={contractor2.index}
                                        name={contractor2.name}
                                        category={contractor2.category}
                                        phone={contractor2.phone}
                                        area={contractor2.area}
                                        yearsInBusiness={contractor2.yearsInBusiness}
                                        imageUrl={contractor2.imageUrl}
                                        streetaddress={contractor2.streetaddress}
                                        cityaddress={contractor2.cityaddress}
                                    />
                                                                        <ContractorCard
                                        index={contractor3.index}
                                        name={contractor3.name}
                                        category={contractor3.category}
                                        phone={contractor3.phone}
                                        area={contractor3.area}
                                        yearsInBusiness={contractor3.yearsInBusiness}
                                        imageUrl={contractor3.imageUrl}
                                        streetaddress={contractor3.streetaddress}
                                        cityaddress={contractor3.cityaddress}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                {/* Uncomment and update the ModalSection component according to your use */}
                {/*<ModalSection channel="vimeo" videoId="99025203" closeModal={closeModal} isOpen={isOpen} />*/}
            </section>
        </React.Fragment>
    );
};

export default Section;

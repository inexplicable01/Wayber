import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
// Import Vector Map
import Vector from './MapVector';

//Import Breadcrumb
import BreadCrumb from '../../../Components/Common/BreadCrumb';


const VectorMaps = () => {
  document.title="How to Buy a Home Step by Step | Velzon - " + process.env.APPNAME_TITLE;
  const steps = [
    'Research and prepare',
    'Arrange financing',
    'Develop a list of criteria',
    'Search for properties',
    'Attend open houses and schedule private viewings',
    'Conduct due diligence',
    'Make an offer',
    'Negotiate',
    'Hire a real estate attorney',
    'Schedule a home inspection',
    'Obtain homeowners insurance',
    'Finalize financing',
    'Conduct a final walkthrough',
    'Close the deal',
  ];
    return (
        <React.Fragment>
            <div className="page-content">
                
                <Container fluid>
                    <BreadCrumb title="Vector" pageTitle="Maps" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader >
                                    <h4 className="card-title mb-0">Markers</h4>
                                </CardHeader>
                                <CardBody>
    <div className="home-buying-process">
      <h2>Home Buying Process Without an Agent</h2>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">USA Vector Map</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="usa-vectormap" style={{ "height": "350px" }}>
                                        <Vector
                                            value="us_aea"
                                            width="724"
                                            color="#5ea3cb"
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Canada Vector Map</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="canada-vectormap" style={{ "height": "350px" }}>
                                        <Vector
                                            value="ca_lcc"
                                            width="500"
                                            color="#58caea"
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Russia Vector Map</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="russia-vectormap" >
                                        <Vector
                                            value="ru_mill"
                                            width="500"
                                            color="#6ada7d"
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>


                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Spain Vector Map</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="spain-vectormap" >
                                        <Vector
                                            value="es_mill"
                                            width="500"
                                            color="#7084c7"
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>


                </Container>

            </div>
        </React.Fragment>
    );
};

export default VectorMaps;
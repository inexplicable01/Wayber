import './ContractorCard.css';
import React from 'react';
import PropTypes from 'prop-types';
// import {Col, Row} from "reactstrap";
import {Container, Row, Col} from "reactstrap";

const ContractorCard = ({
                            index,
                            name,
                            category,
                            phone,
                            area,
                            yearsInBusiness,
                            imageUrl,
                            streetaddress,
                            cityaddress
                        }) => {
    return (

        <Row className="contractor-card my-2 py-2">
            <Col xs="3" md="2">
                <img src={imageUrl} alt={`${name} Logo`} className="img-fluid contractor-image"/>
            </Col>
            <Col xs="7" md="7">

                <div className="custom-container">
                    <Row className="top-row">
                        <Col className="contractor-header">
                            <h1 className="mb-0">{index}. {name}</h1>
                            <p className="contractor-category">{category}</p>
                        </Col>
                    </Row>
                    <Row className="middle-row">
                        <Col md="2">
                            <a href='https://github.com/jsx-eslint/esl'>Website</a>
                        </Col>
                        <Col md="2">
                            <a href='https://github.com/jsx-eslint/esl'>Services</a>
                        </Col>
                        <Col md="2">
                            <a href='https://github.com/jsx-eslint/esl'>Services</a>
                        </Col>
                        <Col md="2">
                            <a href='https://github.com/jsx-eslint/esl'>More Info</a>
                        </Col>

                    </Row>

                    <Row className="bottom-row">
                        {/*<Col>*/}
                        {/*    <p className="contractor-years mb-0">{yearsInBusiness} Years in Business</p>*/}
                        {/*</Col>*/}
                        <p className="contractor-years mb-0">From Business: Ballard Sheet Metal Works, Inc., is known
                            for providing quality custom fabrication of all types of metal since 1907. We serve clients
                            in the greater Seattle, WA,…</p>
                    </Row>

                </div>

            </Col>
            <Col xs="2" md="3">
                <Col className="contractor-contact" xs="12" sm="12">
                    <h1 className="contractor-phone mb-0">{phone}</h1>
                    <br/>
                    <h4 className=" mb-0">{streetaddress}</h4>
                    <h4 className=" mb-0">{cityaddress}</h4>
                    <br/>
                    <p className=" contractor-area mb-0">Serving the {area} Area</p>
                </Col>
            </Col>
        </Row>
    );
};

ContractorCard.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    yearsInBusiness: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    streetaddress: PropTypes.string.isRequired,
    cityaddress: PropTypes.string.isRequired,
};

export default ContractorCard;

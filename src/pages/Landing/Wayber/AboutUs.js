import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
} from "reactstrap";

import {Link} from "react-router-dom";
import PictureCarousel from './PictureCarousel';


class AboutUs extends Component {

    render() {

        return (
            <React.Fragment>

                <section className="section section-lg" id="features">
                    <div className="bg-overlay"></div>
                    <Container>
                        <Row className="vertical-content">
                            <Col lg={5}>
                                <div className="features-box text-center">
                                    <h3>
                                        Real Estate Transactions
                                    </h3>
                                    <h3>
                                        Safe. Simple. Direct.
                                    </h3>
                                    <ul className=" list-unstyled mt-4 features-item-list">
                                        <li className="">All Tools and Knowledge in one place</li>
                                        <li className="">
                                            Saving Up $30000 (3%) of any transactions
                                        </li>

                                    </ul>
                                    <Link
                                        to="#"
                                        className="btn btn-primary mt-4 waves-effect waves-light"
                                    >
                                        Learn More <i className="mdi mdi-arrow-right"></i>
                                    </Link>
                                </div>
                            </Col>
                            <Col lg={7}>
                                <PictureCarousel/>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default AboutUs;

import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "reactstrap";
// import '../../../../src/assets/css/waves.css';
// import '../../../../src/assets/css/style.css';
//Importing Modal
import ModalSection from "./ModalSection";
import wave1 from '../../../../src/assets/images/wave-shape/wave1.png';
import wave2 from '../../../../src/assets/images/wave-shape/wave2.png';
import wave3 from '../../../../src/assets/images/wave-shape/wave3.png';

class Section extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        };
        this.closeModal.bind(this)
        this.callModal.bind(this);
    }

    callModal = () => {
        this.setState({isOpen: true})
    };

    closeModal = () => {
        this.setState({isOpen: false})
    };
    // {/*"C:\Users\waich\velzon\React\Saga\modern\src\assets\images\prettyhomes\pexels-binyamin-mellish-106399.jpg"*/}
    //

    render() {
        return (
            <React.Fragment>
                <section
                    className="section bg-home home-half"
                    id="home"
                    // style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/bg-home.jpg)`}}
                    // data-image-src="images/prettyhomes/pexels-binyamin-mellish-106399.jpg"
                >
                    <div className="bg-overlay"></div>
                    <div className="display-table">
                        <div className="display-table-cell">
                            <Container>
                                <Row>
                                    <Col
                                        lg={{size: 10, offset: 1}}
                                        className="col-lg-8  text-white text-center"
                                    >
                                        <h1 className="home-title">
                                            Data Driven Real Estate
                                        </h1>
                                        <p className="offset-lg-2 home-desc">
                                            For Engineers by Engineers
                                        </p>
                                        <br/>
                                        <br/>

                                        <p className="play-shadow mt-4">
                                            <Link
                                                to="#"
                                                onClick={this.callModal}
                                                className="play-btn video-play-icon play-icon-grey"
                                            >
                                                <i className="mdi mdi-play text-center play-icon-grey"></i>
                                            </Link>
                                        </p>
                                        <p className="offset-lg-2 home-desc">
                                            Find out how we provide better service
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                    <div className="wave-effect wave-anim">
                        <div className="waves-shape shape-one">
                            <div
                                className="wave wave-one"
                                style={{
                                    backgroundImage: `url(${wave1})`,
                                }}
                            ></div>
                            {/*<div style={{ backgroundColor: 'black', width: '100%', height: '100%' }}></div>*/}


                        </div>
                        <div className="waves-shape shape-two">
                            <div
                                className="wave wave-two"
                                style={{
                                    backgroundImage: `url(${wave2})`,
                                }}
                            ></div>
                        </div>
                        <div className="waves-shape shape-three">
                            <div
                                className="wave wave-three"
                                style={{
                                    backgroundImage: `url(${wave3})`,
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Render ModalSection Component for Modal */}
                    <ModalSection channel="vimeo" videoId="99025203" closeModal={this.closeModal}
                                  isOpen={this.state.isOpen}/>
                </section>
            </React.Fragment>
        );
    }
}

export default Section;

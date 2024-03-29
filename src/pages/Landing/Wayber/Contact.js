import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Section Title
import SectionTitle from "./section-title";

class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <section className="section " id="contact">
          <Container>
            {/* section title */}
            <SectionTitle
              title="GET IN TOUCH"
              desc="We are an open book.   We wish to help home buyers and sellers make real estate easy."
            />

            <Row>
              <Col lg={4}>
                <div className="mt-4 pt-4">
                  <p>
                    <span className="h5">Office Address 1:</span>
                    <br />{" "}
                    <span className="text-muted d-block mt-2">
                      4461 Cedar Street Moro, WA 98105
                    </span>
                  </p>

                  <p className="mt-4">
                    <span className="h5">Working Hours:</span>
                    <br />{" "}
                    <span className="text-muted d-block mt-2">
                      24 Hrs
                    </span>
                  </p>
                </div>
              </Col>
              <Col lg={8}>
                <div className="custom-form mt-4 pt-4">
                  <form name="myForm">
                    <p id="error-msg"></p>
                    <div id="simple-msg"></div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group mt-2">
                          <input name="name" id="name" type="text" className="form-control"
                            placeholder="Your name*" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mt-2">
                          <input name="email" id="email" type="email" className="form-control"
                            placeholder="Your email*" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <input type="text" className="form-control" id="subject" name="subject"
                            placeholder="Your Subject.." />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <textarea name="comments" id="comments" rows="4" className="form-control"
                            placeholder="Your message..."></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 text-end">
                        <input type="submit" id="submit" name="send" className="submitBnt btn btn-primary"
                          value="Send Message" />
                      </div>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Features;

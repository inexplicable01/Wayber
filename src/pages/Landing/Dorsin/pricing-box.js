import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";

class PricingBox extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.pricings.map((pricing, key) => (
          <Col lg={4} key={key}>
            <div
              className={
                pricing.isActive
                  ? "text-center pricing-box bg-white hover-effect price-active"
                  : "text-center pricing-box hover-effect"
              }
            >
              <h4 className="text-uppercase">{pricing.title}</h4>
              <h1>${pricing.upfrontprice}</h1>
              <h6 className="text-uppercase text-muted">
                Up Front
              </h6>
              <h1>${pricing.closingprice}</h1>
              <h6 className="text-uppercase text-muted">
                At Closing
              </h6>
              <div className="pricing-border"></div>
              <div className="plan-features mt-4">
                {pricing.features.map((feature, key) => (
                  <React.Fragment key={key}>
                    {feature.isLeft ? (<p><b className="text-primary">{feature.value}</b> {feature.title}</p>) :
                      (<p key={key}>{feature.title}:{" "}<b className="text-primary">{feature.value}</b></p>)}
                  </React.Fragment>
                ))}
                <p><b className="text-primary">No</b> Hidden Fees</p>
              </div>
              <Link
                to="/login"
                className="btn btn-primary waves-effect waves-light mt-4"
              >
                Learn More
              </Link>
            </div>
          </Col>
        ))}
      </React.Fragment>
    );
  }
}

export default PricingBox;

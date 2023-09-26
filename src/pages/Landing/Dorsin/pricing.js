import React, { Component } from "react";
import { Container, Row } from "reactstrap";

//Import Section Title
import SectionTitle from "./section-title";

//Import Pricing
import PricingBox from "./pricing-box";

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pricings: [
        {
          title: "Economy",
          upfrontprice: 700.00,
          closingprice: 800.00,
          duration: "MONTH",
          features: [
            { title: "MLS Listing", value: "6 pics" },
            { title: "", value: "50MB" },
            { title: "Video", value: "No" },
            { title: "Showings", value: "No", isLeft: true },
            // { title: "Hidden Fees", value: "No" },
          ],
        },
        {
          title: "DELUXE",
          upfrontprice: 19.90,
          closingprice: 19.90,
          duration: "MONTH",
          isActive: true,
          features: [
            { title: "MLS Listing", value: "15 pics" },
            { title: "Onlinespace", value: "500MB" },
            { title: "Support", value: "Yes" },
            { title: "Domain", value: "10", isLeft: true },
            { title: "Exclusive Agency", value: "No" },
          ],
        },
        {
          title: "ULTIMATE",
          upfrontprice: 19.90,
          closingprice: 19.90,
          duration: "MONTH",
          features: [
            { title: "Bandwidth", value: "100GB" },
            { title: "Onlinespace", value: "2 GB" },
            { title: "Support", value: "Yes" },
            { title: "Domain", value: "Unlimited", isLeft: true },
            // { title: "Hidden Fees", value: "No" },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <section className="section pt-5" id="pricing">
          <Container>
            {/* section title */}
            <SectionTitle
              title="Our Pricing"
              desc="Call to action pricing table is really crucial to your for your business website. Make your bids stand-out with amazing options."
            />

            <Row className="mt-5">
              {/* pricing box */}
              <PricingBox pricings={this.state.pricings} />
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Pricing;

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
            { title: "Virtual Staging", value: "6 pics" },
            { title: "Showings/Open Houses", value: "Yes" },
            { title: "Lockbox", value: "Yes" },
            { title: "Exclusive Agency", value: "No" },
            { title: "Showings", value: "Yes", isLeft: true },
            // { title: "Hidden Fees", value: "No" },
          ],
        },
        {
          title: "DELUXE",
          upfrontprice: 700.00,
          closingprice: 1800.00,
          duration: "MONTH",
          isActive: true,
          features: [
            { title: "MLS Listing", value: "Unlimited", isLeft: true },
              { title: "Professional Pictures", value: "Yes" },
               { title: "Professional Video", value: "No" },
            { title: "Virtual Staging", value: "6 pics" },
              { title: "Lockbox", value: "Yes" },
            { title: "Showings/Open Houses", value: "Yes" },

            { title: "Exclusive Agency", value: "Yes" },
          ],
        },
        {
          title: "ULTIMATE",
          upfrontprice: 1100.00,
          closingprice: 3900.00,
          duration: "MONTH",
          features: [
            { title: "MLS Listing", value: "Unlimited" , isLeft: true },
              { title: "Professional Pictures", value: "Yes" },
               { title: "Professional Video", value: "Yes" },

            { title: "Virtual Staging", value: "Yes" },
            { title: "Lockbox", value: "Yes" },
             { title: "Showings/Open Houses", value: "Yes" },
            { title: "Exclusive Agency", value: "Yes" },
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
              title="Our Pricing - Low Flat Fee Service!"
              desc="Our pricing is structured so that you can get top notch listing service at paying a small upfront fee. The rest of the fee will be paid at closing."
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

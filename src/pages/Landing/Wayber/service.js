import React, { Component } from "react";
import { Container, Row , Col} from "reactstrap";

//Import Section Title
import SectionTitle from "./section-title";
import ServiceBox from "./services-box";
import image2 from "./../../../assets/images/estate flow-04.jpg";
import image3 from "./../../../assets/images/estate flow-01.jpg";
class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services1: [
        {
          icon: "pe-7s-smile",
          title: "Convenient",
          desc: "All the Home Buying Tools and Knowledge you need in one place.",
        },
        {
          icon: "pe-7s-diamond",
          title: "Safe and Secure",
          desc:
            "Credibly brand standards compliant users without extensible services. ",
        },
        {
          icon: "pe-7s-piggy",
          title: "Convenient and Reliable",
          desc:
            "Secure, Smart, Easy way to close Real Estate Transaction.",
        },
      ],
      // services2: [
      //   {
      //     icon: "pe-7s-science",
      //     title: "Awesome Support",
      //     desc:
      //       "It is a paradisematic country, in which roasted parts of sentences fly into your mouth leave for the far World.",
      //   },
      //   {
      //     icon: "pe-7s-news-paper",
      //     title: "Truly Multipurpose",
      //     desc:
      //       "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.",
      //   },
      //   {
      //     icon: "pe-7s-plane",
      //     title: "Easy to customize",
      //     desc:
      //       "Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia.",
      //   },
      // ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <section className={"section " + this.props.sectionClass} id="services">
          <Container>
            {/* section title */}
            <SectionTitle
              title="Our Services"
              desc="We help Buyer, Sellers, Agents connect in highly efficient manner in Real Estate Transactions."
            />

            {/*<Row className="mt-4">*/}
            {/*  /!* services box *!/*/}
            {/*  <ServiceBox services={this.state.services1} />*/}
            {/*</Row>*/}
{/*// Inside Process component's render method:*/}

<Row className="mt-4">
  {this.state.services1.map((service, key) => (
    <React.Fragment key={key}>
      {/* Service Box */}
      <Col lg={4} className="d-flex flex-column justify-content-center">
        <ServiceBox service={service} />
      </Col>

      {/* Image */}
      <Col lg={8} className="d-flex justify-content-center align-items-center">
        <img src={image2} alt='blah' style={{ width: '100%', maxHeight: '66vh' }} />
      </Col>
    </React.Fragment>
  ))}
</Row>

            {/*<Row className="mt-4">*/}
            {/*  /!* service box *!/*/}
            {/*  <ServiceBox services={this.state.services2} />*/}
            {/*</Row>*/}
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Process;

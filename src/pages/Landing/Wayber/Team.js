import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import waichakpic from '../../../assets/images/team/DSC05939.jpg'
import mo from '../../../assets/images/team/Mo.jpg'
//Import Section Title
import SectionTitle from "./section-title";
import TeamBox from "./TeamBox";

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [
        {
          image: waichakpic,
          title: "Waichak Luk",
          desc: "CEO",
        },
        {
          image: mo,
          title: "Mohamed Abuzaid",
          desc: "CMO",
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <section className="section pt-4" id="team">
          <Container>
            {/* section title */}
            <SectionTitle
              title="BEHIND THE PEOPLE"
            />

            <Row className="mt-5">
              {/* team box */}
              <TeamBox teams={this.state.teams} />
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Clients;

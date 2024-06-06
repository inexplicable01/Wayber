import React from "react";
import ClientSchema from "./ClientSchema";
import { Container } from "reactstrap";
import Loader from "../../Components/Common/Loader";

const index = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div>
            <ClientSchema />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default index;

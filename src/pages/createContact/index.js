import React from "react";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import Loader from "../../Components/Common/Loader";
import CreateContactForm from "./CreateContact";

const CreateContact = () => {
  const data = useSelector((state) => state.clientProfileReducer);
  

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div>
            {data?.loading ? (
              <Loader />
            ) : (
              <CreateContactForm  />
            )}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateContact;

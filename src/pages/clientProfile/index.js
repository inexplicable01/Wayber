import React from "react";
import CreateClientProfileForm from "./CreateClientProfileForm";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import Loader from "../../Components/Common/Loader";

const CreateClientProfile = () => {
  const data = useSelector((state) => state.clientProfileReducer);
  const handleFormSubmit = (formValues) => {
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div>
            {data?.loading ? (
              <Loader />
            ) : (
              <CreateClientProfileForm onSubmit={handleFormSubmit} />
            )}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateClientProfile;

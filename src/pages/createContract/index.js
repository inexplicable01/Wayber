import React from "react";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import Loader from "../../Components/Common/Loader";
import CreateContractForm from "./CreateContract";

const CreateContract = () => {
  const data = useSelector((state) => state.clientProfileReducer);
  

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div>
            {data?.loading ? (
              <Loader />
            ) : ( data.contractinfoready?
                    (<CreateContractForm  />):
                    (<CreateContractForm  />)

            )}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateContract;

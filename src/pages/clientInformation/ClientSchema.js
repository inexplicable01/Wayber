import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
  Alert,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { submitInformation } from "../../store/clientInformation/actions";
import {
  fetchProfilesStart,
  deleteClientInformationStart,
  editClientInformationStart,
} from "../../store/clientInformation/actions";
import ClientTable from "./ClientTable";
import Loader from "../../Components/Common/Loader";


const validationSchema = Yup.object({
  firstName: Yup.string().required("Please Enter First Name"),
  lastName: Yup.string().required("Please Enter Last Name"),
  age: Yup.number().required("Please Enter Age"),
  email: Yup.string().email("Invalid email").required("Please Enter Email"),
  currentAddress: Yup.string().required("Please Enter your Address"),
});

const CreateClientProfileForm = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { details } = useSelector((state) => state.clientInformationReducer);

  const dispatch = useDispatch();
  const clientInformation = useSelector(
    (state) => state.clientInformationReducer
  );
  useEffect(() => {
    if (details.success) {
      setRefreshKey((oldKey) => oldKey + 1);
    }
  }, [details.success]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      currentAddress: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        submitInformation(values, () => {
          dispatch(fetchProfilesStart());
        })
      );
    },
  });

  useEffect(() => {
    if (details.success) {
      formik.resetForm();
    }
  }, [details.success]);

  const handleDelete = (clientId) => {
    dispatch(deleteClientInformationStart(clientId));
  };

  const handleSubmitEdit = (clientId, updatedData) => {
    dispatch(editClientInformationStart(clientId, updatedData));
  };

  useEffect(() => {
    dispatch(fetchProfilesStart());
  }, [refreshKey]);

  if (clientInformation?.details?.loading) {
    return <div><Loader/></div>;
  }

  return (
    <React.Fragment>
      <Form
        onSubmit={formik.handleSubmit}
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                invalid={formik.touched.firstName && !!formik.errors.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <FormFeedback type="invalid">
                  {formik.errors.firstName}
                </FormFeedback>
              ) : null}
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                invalid={formik.touched.lastName && !!formik.errors.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <FormFeedback type="invalid">
                  {formik.errors.lastName}
                </FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.age}
                invalid={formik.touched.age && !!formik.errors.age}
              />
              {formik.touched.age && formik.errors.age ? (
                <FormFeedback type="invalid">{formik.errors.age}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                invalid={formik.touched.email && !!formik.errors.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <FormFeedback type="invalid">
                  {formik.errors.email}
                </FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="currentAddress"> Address</Label>
              <Input
                id="currentAddress"
                name="currentAddress"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.currentAddress}
                invalid={
                  formik.touched.currentAddress &&
                  !!formik.errors.currentAddress
                }
              />
              {formik.touched.currentAddress && formik.errors.currentAddress ? (
                <FormFeedback type="invalid">
                  {formik.errors.currentAddress}
                </FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit" color="success">
          Submit
        </Button>
      </Form>
      <ClientTable
        clients={clientInformation?.profiles}
        handleDelete={handleDelete}
        handleUpdate={handleSubmitEdit}
      />
    </React.Fragment>
  );
};

export default CreateClientProfileForm;

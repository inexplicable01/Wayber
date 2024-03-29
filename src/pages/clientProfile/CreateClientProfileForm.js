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
import { submitForm } from "../../store/clientProfile/actions";
import { ToastContainer, toast } from "react-toastify";
import { RESET_SUCCESS_STATE } from "../../store/clientProfile/actionTypes";

const CreateClientProfileForm = ({ onSubmit }) => {
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.clientProfileReducer);
  //console.log("formData", formData);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      age: "",
      email: "",
      estimatedAnnualIncome: "",
      currentAddress: "",
      desiredLocation: "",
      role: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter First Name"),
      middleName: Yup.string().required("Please Enter Middle Name"),
      lastName: Yup.string().required("Please Enter Last Name"),
      age: Yup.number().required("Please Enter Age"),
      email: Yup.string().required("Please Enter Email"),
      estimatedAnnualIncome: Yup.number().required(
        "Please Enter Estimated Annual Income"
      ),
      currentAddress: Yup.string().required("Please Enter Current Address"),
      desiredLocation: Yup.string().required("Please Enter Desired Location"),
      role: Yup.string().required("Please select a role"),
      city: Yup.string().required("Please Enter city"),
      state: Yup.string().required("Please Enter state"),
      zip: Yup.string().required("Please Enter zip"),
      phone: Yup.string()
        .required("Buyer's phone number is required")
        .matches(/^\d+$/, "phone Number must contain only digits"),
    }),

    onSubmit: (values) => {
      console.log(values);
      dispatch(submitForm(values));
    },
  });

  return (
    <React.Fragment>
      <Form
        onSubmit={formik.handleSubmit}
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        <Row>
          <Col md={4}>
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
          <Col md={4}>
            <FormGroup>
              <Label for="middleName">Middle Name</Label>
              <Input
                id="middleName"
                name="middleName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.middleName}
                //invalid={formik.touched.middleName && !!formik.errors.middleName}
              />
              {formik.touched.middleName && formik.errors.middleName ? (
                <FormFeedback type="invalid">
                  {formik.errors.middleName}
                </FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                //invalid={formik.touched.lastName && !!formik.errors.lastName}
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
              <Label for="role">Role</Label>
              <Input
                id="role"
                name="role" // Corrected the name attribute
                type="select"
                onChange={formik.handleChange}
                value={formik.values.role}
                invalid={formik.touched.role && !!formik.errors.role}
                style={{ padding: 13 }}
              >
                <option value="">Select Role</option>
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
                <option value="Closing Agent">Closing Agent</option>
              </Input>
              {formik.touched.role && formik.errors.role ? (
                <FormFeedback style={{ paddingTop: 13 }} type="invalid">
                  {formik.errors.role}
                </FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="estimatedAnnualIncome">Estimated Annual Income</Label>
              <Input
                id="estimatedAnnualIncome"
                name="estimatedAnnualIncome"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.estimatedAnnualIncome}
                invalid={
                  formik.touched.estimatedAnnualIncome &&
                  !!formik.errors.estimatedAnnualIncome
                }
              />
              {formik.touched.estimatedAnnualIncome &&
              formik.errors.estimatedAnnualIncome ? (
                <FormFeedback type="invalid">
                  {formik.errors.estimatedAnnualIncome}
                </FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="desiredLocation">Desired Location</Label>
              <Input
                id="desiredLocation"
                name="desiredLocation"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.desiredLocation}
                invalid={
                  formik.touched.desiredLocation &&
                  !!formik.errors.desiredLocation
                }
              />
              {formik.touched.desiredLocation &&
              formik.errors.desiredLocation ? (
                <FormFeedback type="invalid">
                  {formik.errors.desiredLocation}
                </FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="currentAddress">Current Address</Label>
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
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="city">city</Label>
              <Input
                id="city"
                name="city"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.city}
                invalid={formik.touched.city && !!formik.errors.city}
              />
              {formik.touched.city && formik.errors.city && (
                <FormFeedback type="invalid">{formik.errors.city}</FormFeedback>
              )}
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Label for="state">state</Label>
              <Input
                id="state"
                name="state"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.state}
                invalid={formik.touched.state && !!formik.errors.state}
              />
              {formik.touched.state && formik.errors.state && (
                <FormFeedback type="invalid">
                  {formik.errors.state}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>

          <Col md={4}>
            <FormGroup>
              <Label for="zip">zip</Label>
              <Input
                id="zip"
                name="zip"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.zip}
                invalid={formik.touched.zip && !!formik.errors.zip}
              />
              {formik.touched.zip && formik.errors.zip && (
                <FormFeedback type="invalid">{formik.errors.zip}</FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="phone">Buyer phone No.</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phone}
                invalid={formik.touched.phone && !!formik.errors.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <FormFeedback type="invalid">
                  {formik.errors.phone}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit" color="success">
          Submit
        </Button>
      </Form>
      {formData.success ? (
        <>
          {toast("Client Profile Register Successfully.", {
            position: "top-right",
            hideProgressBar: false,
            className: "bg-success text-white",
            progress: undefined,
            toastId: "",
            onClose: () => {
              dispatch({ type: RESET_SUCCESS_STATE });
            },
          })}
          <ToastContainer autoClose={2000} limit={1} />
        </>
      ) : null}
      {formData?.error && formData?.error ? (
        <>
          {toast("Failed to register client profile.", {
            position: "top-right",
            hideProgressBar: false,
            className: "bg-fail text-white",
            progress: undefined,
            toastId: "",
          })}
          <ToastContainer autoClose={2000} limit={1} />
        </>
      ) : null}
    </React.Fragment>
  );
};

export default CreateClientProfileForm;

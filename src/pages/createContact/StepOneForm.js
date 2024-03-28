import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";

const StepOneForm = ({
  formik,
  handleAddressChange,
  clientProfiles,
  address,
  nextStep,
  displayPDF,
  currentStep,
  useStepFieldValidator,

}) => {

  const areFieldsValidForCurrentStep = useStepFieldValidator(formik, currentStep);
  return (
     <Form
    onSubmit={formik.handleSubmit}
    className="fontFamily_Roboto_sans_serif"
  >
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="select"
              name="address"
              id="address"
              onChange={(e) => {
                formik.handleChange(e);
                handleAddressChange(e);
              }}
              value={formik.values.address}
              invalid={formik.touched.address && !!formik.errors.address}
              className="p13"
            >
              <option value="">Select Address</option>
              {address?.slice(0, 10)?.map((property) => (
                <option key={property.zpid} value={property.zpid}>
                  <div>
                    {`${property.streetAddress}, ${property.city}, ${property.state} ${property.zipcode}`}
                  </div>
                </option>
              ))}
            </Input>
            {formik.touched.address && formik.errors.address ? (
              <FormFeedback type="invalid">
                {formik.errors.address}
              </FormFeedback>
            ) : null}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="buyer">Buyer</Label>
            <Input
              type="select"
              name="buyer"
              id="buyer"
              onChange={formik.handleChange}
              value={formik.values.buyer}
              invalid={formik.touched.buyer && !!formik.errors.buyer}
              className="p13"
            >
              <option value="">Select Buyer</option>
              {clientProfiles.map((profile, i) => {
                if (profile.role === "Buyer") {
                  return (
                    <option
                      key={i}
                      value={profile.firstName + " " + profile.lastName}
                    >
                      {profile.firstName + " " + profile.lastName}
                    </option>
                  );
                }
                return null;
              })}
            </Input>
            {formik.touched.buyer && formik.errors.buyer && (
              <FormFeedback>{formik.errors.buyer}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="seller">Seller</Label>
            <Input
              type="select"
              name="seller"
              id="seller"
              onChange={formik.handleChange}
              value={formik.values.seller}
              invalid={formik.touched.seller && !!formik.errors.seller}
              className="p13"
            >
              <option value="">Select Seller</option>
              {clientProfiles.map((profile, i) => {
                if (profile.role === "Seller") {
                  return (
                    <option
                      key={i}
                      value={profile.firstName + " " + profile.lastName}
                    >
                      {profile.firstName + " " + profile.lastName}
                    </option>
                  );
                }
                return null;
              })}
            </Input>
            {formik.touched.seller && formik.errors.seller && (
              <FormFeedback>{formik.errors.seller}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="closingAgent">Closing Agent</Label>
            <Input
              type="select"
              name="closingAgent"
              id="closingAgent"
              onChange={formik.handleChange}
              value={formik.values.closingAgent}
              invalid={
                formik.touched.closingAgent && !!formik.errors.closingAgent
              }
              className="p13"
            >
              <option value="">Select Closing Agent</option>
              {clientProfiles.map((profile, index) => {
                if (profile.role === "Closing Agent") {
                  return (
                    <option
                      key={index}
                      value={profile.firstName + " " + profile.lastName}
                    >
                      {profile.firstName + " " + profile.lastName}
                    </option>
                  );
                }
                return null;
              })}
            </Input>
            {formik.touched.closingAgent && formik.errors.closingAgent && (
              <FormFeedback type="invalid">
                {formik.errors.closingAgent}
              </FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="offerExpirationDate">Offer Expiration Date</Label>
            <Input
              id="offerExpirationDate"
              name="offerExpirationDate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.offerExpirationDate}
              invalid={
                formik.touched.offerExpirationDate &&
                !!formik.errors.offerExpirationDate
              }
              className="p13"
            />
            {formik.touched.offerExpirationDate &&
              formik.errors.offerExpirationDate && (
                <FormFeedback>{formik.errors.offerExpirationDate}</FormFeedback>
              )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="closingDate">Closing Date</Label>
            <Input
              id="closingDate"
              name="closingDate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.closingDate}
              invalid={
                formik.touched.closingDate && !!formik.errors.closingDate
              }
              className="p13"
            />
            {formik.touched.closingDate && formik.errors.closingDate && (
              <FormFeedback>{formik.errors.closingDate}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="titleInsuranceCompany">Title Insurance Company</Label>
            <Input
              id="titleInsuranceCompany"
              name="titleInsuranceCompany"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.titleInsuranceCompany}
              invalid={
                formik.touched.titleInsuranceCompany &&
                !!formik.errors.titleInsuranceCompany
              }
              className="p13"
            />
            {formik.touched.titleInsuranceCompany &&
              formik.errors.titleInsuranceCompany && (
                <FormFeedback type="invalid">
                  {formik.errors.titleInsuranceCompany}
                </FormFeedback>
              )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
              invalid={formik.touched.price && !!formik.errors.price}
            />
            {formik.touched.price && formik.errors.price && (
              <FormFeedback>{formik.errors.price}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="closingDate">Possession Date</Label>
            <Input
              id="possessionDate"
              name="possessionDate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.possessionDate}
              invalid={
                formik.touched.closingDate && !!formik.errors.closingDate
              }
              className="p13"
            />
            {formik.touched.possessionDate && formik.errors.possessionDate && (
              <FormFeedback>{formik.errors.possessionDate}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {currentStep == 1 && (
          <Button
            color="primary"
            onClick={nextStep}
            disabled={!areFieldsValidForCurrentStep}
          >
            Next
          </Button>
        )}
      </div>

      <div className="conatiner">
        <div
          className={displayPDF ? "display_block" : "display_none"}
          id="your-webviewer-container-id"
        ></div>
      </div>
    </Form>
  );
};

export default StepOneForm;

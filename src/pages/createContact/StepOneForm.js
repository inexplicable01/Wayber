import React,{useEffect} from "react";
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
  const areFieldsValidForCurrentStep = useStepFieldValidator(
    formik,
    currentStep
  );
  const formatNumberInput = (value) => {
    const numbersOnly = value.replace(/\D/g, "");
    return numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
useEffect(() => {
  const listingAgentName = clientProfiles?.userZPID?.details?.listing_agent?.display_name;
  if (listingAgentName && listingAgentName !== formik.values.seller) {
    formik.setFieldValue('seller', listingAgentName);
  }
}, [clientProfiles, formik.values.seller, formik.setFieldValue]);
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
              {clientProfiles?.firebase?.profiles.map((profile, i) => {
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
              value={
                clientProfiles?.userZPID?.details?.listing_agent
                  ?.display_name || formik.values.seller
              }
              invalid={formik.touched.seller && !!formik.errors.seller}
              className="p13"
            >
              <option value="">Select Seller</option>
              {clientProfiles?.userZPID?.details?.listing_agent
                ?.display_name && (
                <option
                  value={
                    clientProfiles.userZPID.details.listing_agent.display_name
                  }
                  disabled={true}
                  selected={true}
                >
                  {clientProfiles.userZPID.details.listing_agent.display_name}
                </option>
              )}
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
              id="closingAgent"
              name="closingAgent"
              type="select"
              onChange={formik.handleChange}
              value={formik.values.closingAgent}
              invalid={
                formik.touched.closingAgent && !!formik.errors.closingAgent
              }
              className="p13"
            >
              <option value="">Select Closing Agent</option>
              {clientProfiles?.vendorDetails?.data
                ?.filter((vendor) => vendor.role === "EscrowOfficers")
                .map((agent, index) => (
                  <option key={index} value={agent.name}>
                    {agent.name}
                  </option>
                ))}
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
        <Col md={6}>
          <FormGroup>
            <Label for="titleInsuranceCompany">Title Insurance Company</Label>
            <Input
              id="titleInsuranceCompany"
              name="titleInsuranceCompany"
              type="select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.titleInsuranceCompany}
              invalid={
                formik.touched.titleInsuranceCompany &&
                !!formik.errors.titleInsuranceCompany
              }
              className="p13"
            >
              <option value="">Select a company</option>
              {clientProfiles?.vendorDetails?.data
                ?.filter(
                  (vendor) =>
                    vendor.role === "titlecompany" ||
                    vendor.role === "TitleCompany"
                )
                .map((company, index) => (
                  <option key={index} value={company.name}>
                    {company.name}
                  </option>
                ))}
            </Input>
            {formik.touched.titleInsuranceCompany &&
              formik.errors.titleInsuranceCompany && (
                <FormFeedback type="invalid">
                  {formik.errors.titleInsuranceCompany}
                </FormFeedback>
              )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="text"
              onChange={(e) => {
                const formattedValue = formatNumberInput(e.target.value);
                e.target.value = formattedValue;
                formik.setFieldValue("price", formattedValue.replace(/,/g, ""));
              }}
              onBlur={formik.handleBlur}
              value={
                formik.values.price
                  ? formatNumberInput(formik.values.price.toString())
                  : ""
              }
              invalid={formik.touched.price && !!formik.errors.price}
            />
            {formik.touched.price && formik.errors.price && (
              <FormFeedback>{formik.errors.price}</FormFeedback>
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

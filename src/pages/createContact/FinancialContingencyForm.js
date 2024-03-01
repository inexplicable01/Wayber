import React from 'react';
import { Button, Form, FormGroup, Label, Input ,Col,Row} from "reactstrap";

const FinancialContingencyForm = ({ formik, prevStep, nextStep ,FormFeedback}) => {
  return (
    <Form
    onSubmit={formik.handleSubmit}
    className="fontFamily_Roboto_sans_serif"
  >
    <FormGroup>
      <Label
        for="loanType"
        style={{ fontSize: "20px", fontWeight: "700" }}
      >
        Loan Type
      </Label>
      <div>
        {[
          "Conventional First",
          "Conventional Second",
          "Bridge",
          "VA",
          "FHA",
          "USDA",
          "Home Equity",
          "Line of Credit",
          "Other",
        ].map((type, index) => (
          <FormGroup check key={index}>
            <Label check>
              <Input
                type="checkbox"
                name="loanType"
                value={type}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  formik.setFieldValue(
                    "loanType",
                    checked ? value : ""
                  );
                }}
                checked={formik.values.loanType === type}
              />{" "}
              {type}
            </Label>
          </FormGroup>
        ))}
      </div>
      {formik.values.loanType === "Other" && (
        <Input
          type="text"
          name="loanTypeOtherText"
          placeholder="Specify other loan type"
          onChange={formik.handleChange}
          value={formik.values.loanTypeOtherText}
        />
      )}
      {formik.touched.loanType && formik.errors.loanType && (
        <FormFeedback type="invalid">
          {formik.errors.loanType}
        </FormFeedback>
      )}
    </FormGroup>

    <FormGroup>
      <Label for="downPayment">Down Payment</Label>
      <Input
        type="number"
        name="downPayment"
        id="downPayment"
        onChange={formik.handleChange}
        value={formik.values.downPayment}
        invalid={
          formik.touched.downPayment && !!formik.errors.downPayment
        }
      />
      {formik.touched.downPayment && formik.errors.downPayment && (
        <FormFeedback>{formik.errors.downPayment}</FormFeedback>
      )}
    </FormGroup>

    <FormGroup>
      <Label for="applicationKickStart">
        Application Kick Start TimeFrame
      </Label>
      <Input
        type="number"
        name="applicationKickStart"
        id="applicationKickStart"
        onChange={formik.handleChange}
        value={formik.values.applicationKickStart || 5}
        invalid={
          formik.touched.applicationKickStart &&
          !!formik.errors.applicationKickStart
        }
      />
      {formik.touched.applicationKickStart &&
        formik.errors.applicationKickStart && (
          <FormFeedback>
            {formik.errors.applicationKickStart}
          </FormFeedback>
        )}
    </FormGroup>
    <FormGroup>
      <Label for="loanCostProvisions">Loan Cost Provisions</Label>
      <Input
        type="number"
        name="loanCostProvisions"
        id="loanCostProvisions"
        onChange={formik.handleChange}
        value={formik.values.loanCostProvisions}
      />
      {formik.touched.loanCostProvisions &&
        formik.errors.loanCostProvisions && (
          <FormFeedback>
            {formik.errors.loanCostProvisions}
          </FormFeedback>
        )}
    </FormGroup>
  </Form>
  );
};

export default FinancialContingencyForm;

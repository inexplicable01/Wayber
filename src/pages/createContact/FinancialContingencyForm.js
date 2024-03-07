import React from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";

const FinancialContingencyForm = ({
  formik,
  prevStep,
  nextStep,
  FormFeedback,
}) => {
  console.log(
    "formik.errors.applicationKickStart",
    formik.errors.applicationKickStart
  );
  const isFinancialContingency = formik.values.financialContingency;
  return (
    <>
      <FormGroup check>
        <Label
          check
          style={{ fontSize: "20px", fontWeight: "700", marginBottom: "5px" }}
        >
          <Input
            type="checkbox"
            name="financialContingency"
            onChange={formik.handleChange}
            value={isFinancialContingency}
            checked={isFinancialContingency}
          />
          Are you enacting a Financial Contingency?
        </Label>
      </FormGroup>

      {isFinancialContingency && (
        <>
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
                        formik.setFieldValue("loanType", checked ? value : "");
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
            <p style={{ color: "red" }}>
              {formik.errors.applicationKickStart}
            </p>
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
                <FormFeedback>{formik.errors.loanCostProvisions}</FormFeedback>
              )}
          </FormGroup>
        </>
      )}
    </>
  );
};

export default FinancialContingencyForm;

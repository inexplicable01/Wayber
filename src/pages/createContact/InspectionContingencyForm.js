import React from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";

const InspectionContingencyForm = ({
  formik,
}) => {
  const isInspectionContingency = formik.values.inspectionContingency;
  return (
    <>
      <FormGroup check>
        <Label
          check
          style={{ fontSize: "20px", fontWeight: "700", marginBottom: "5px" }}
        >
          <Input
            type="checkbox"
            name="inspectionContingency"
            id="inspectionContingency"
            onChange={formik.handleChange}
            value={isInspectionContingency} 
            checked={isInspectionContingency}
          />
         
          Enact Inspection Contingency?
        </Label>
      </FormGroup>

      {isInspectionContingency && (
        <>
          <Row form>
            <Col>
              <FormGroup>
                <Label for="buyersNotice">Buyer’s Notice</Label>
                <Input
                  type="number"
                  name="buyersNotice"
                  id="buyersNotice"
                  onChange={formik.handleChange}
                  value={formik.values.buyersNotice || "10"}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="additionalTimeForInspections">
                  Additional Time for Inspections
                </Label>
                <Input
                  type="number"
                  name="additionalTimeForInspections"
                  id="additionalTimeForInspections"
                  onChange={formik.handleChange}
                  value={formik.values.additionalTimeForInspections || "5"}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="sellersResponseTime">Seller’s Response Time</Label>
                <Input
                  type="number"
                  name="sellersResponseTime"
                  id="sellersResponseTime"
                  onChange={formik.handleChange}
                  value={formik.values.sellersResponseTime || "3"}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="buyersReplyTime">Buyer’s Reply</Label>
                <Input
                  type="number"
                  name="buyersReplyTime"
                  id="buyersReplyTime"
                  onChange={formik.handleChange}
                  value={formik.values.buyersReplyTime || "3"}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="repairCompletionDate">Repair Completion Date</Label>
                <Input
                  type="number"
                  name="repairCompletionDate"
                  id="repairCompletionDate"
                  onChange={formik.handleChange}
                  value={formik.values.repairCompletionDate || "3"}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup check className="mb-3">
            <Label check>
              <Input
                type="checkbox"
                name="neighborhoodReviewContingency"
                id="neighborhoodReviewContingency"
                onChange={formik.handleChange}
                checked={formik.values.neighborhoodReviewContingency}
              />
              Neighborhood Review Contingency
            </Label>
            {formik.values.neighborhoodReviewContingency && (
              <Input
                type="number"
                name="neighborhoodReviewDays"
                id="neighborhoodReviewDays"
                placeholder="Enter number of days"
                onChange={formik.handleChange}
                value={formik.values.neighborhoodReviewDays || "3"}
              />
            )}
          </FormGroup>
          <Col md={6}>
            <FormGroup check className="mb-3">
              <Label check>
                <Input
                  type="checkbox"
                  name="includeSewerInspection"
                  id="includeSewerInspection"
                  onChange={formik.handleChange}
                  checked={formik.values.includeSewerInspection}
                />
                Include Sewer Inspection
              </Label>
            </FormGroup>
          </Col>
        </>
      )}
    </>
  );
};

export default InspectionContingencyForm;

import {Card, CardBody, CardTitle, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import React from "react";
import ProjectDetails from "./ProjectDetails";
import {Link} from "react-router-dom";

const ProjectDetailCard = (prop) => {
    // console.log('projectGroup',prop.projectGroup)
    const renderEmailList = (emails) => {
        return emails? (
            <ListGroup>
                {emails.map((email, index) => (
                    <ListGroupItem key={index}>{email}</ListGroupItem>
                ))}
            </ListGroup>
        ) : <p>No emails available.</p>;
    };

    const renderFormLinks = (forms, projectGroupID) => {
        return forms ? (
            <ListGroup>
                {forms.map((form, index) => (
                    <ListGroupItem key={index}>
                        <Link to={`/project_details/${projectGroupID}/form/${form}`}>
                            {form}
                        </Link>
                    </ListGroupItem>
                ))}
            </ListGroup>
        ) : <p>No forms available.</p>;
    };
    return <Card>
        <CardBody>
            <CardTitle tag="h5">Project Group Details</CardTitle>
            <Row>
                <Col md={12}>
                    <h6>Address:</h6>
                    <p>{prop.projectGroup.address}</p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h6>Buyers' Emails:</h6>
                    {renderEmailList(prop.projectGroup.buyersEmails)}
                </Col>
                <Col md={6}>
                    <h6>Buyer Agents' Emails:</h6>
                    {renderEmailList(prop.projectGroup.buyerAgentsEmails)}
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h6>Sellers' Emails:</h6>
                    {renderEmailList(prop.projectGroup.sellersEmails)}
                </Col>
                <Col md={6}>
                    <h6>Seller Agents' Emails:</h6>
                    {renderEmailList(prop.projectGroup.sellerAgentsEmails)}
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h6>Loan Officers' Emails:</h6>
                    {renderEmailList(prop.projectGroup.loanOfficersEmails)}
                </Col>
                <Col md={6}>
                    <h6>Forms:</h6>
                    {renderFormLinks(prop.projectGroup.forms, prop.projectGroup.projectGroupID)}
                </Col>
            </Row>
        </CardBody>
    </Card>

}

export default ProjectDetailCard;

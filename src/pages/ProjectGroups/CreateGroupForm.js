import React from 'react';
import {useFormik} from 'formik';
import {Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import {documentnames} from "../../config";
import {createProjectGroup }from "../../store/projectgroup/actions";
import {useSelector, useDispatch} from 'react-redux';
// import * as actions from "../../store/quotes/actions";
import {useProfile} from "../../Components/Hooks/UserHooks";
import { useNavigate } from 'react-router-dom';
const generateRandomName = () => {
    const firstNames = ["John", "Jane", "Chris", "Laura", "Mike", "Linda", "Sarah", "Daniel"];
    const lastNames = ["Smith", "Doe", "Johnson", "Davis", "Brown", "Wilson", "Garcia", "Martinez"];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName}.${lastName}`.toLowerCase();
};


const generateRandomEmail = (type) => {
    const name = generateRandomName();
    let domain;

    if (type === "agent") {
        const agentDomains = ["kellerwilliams.com", "windermere.com"];
        domain = agentDomains[Math.floor(Math.random() * agentDomains.length)];
    } else if (type === "loanOfficer") {
        const loanOfficerDomains = ["chaseloans.com", "firstbank.com"];
        domain = loanOfficerDomains[Math.floor(Math.random() * loanOfficerDomains.length)];
    } else if (type === "people") {
        const loanOfficerDomains = ["gmail.com", "hotmail.com"];
        domain = loanOfficerDomains[Math.floor(Math.random() * loanOfficerDomains.length)];
    }

    return `${name}@${domain}`;
};


const CreateGroupForm = ({onSubmit}) => {
   const dispatch = useDispatch();
    const {userProfile} = useProfile()
const navigate = useNavigate();

    const initialAgentEmails = Array(2).fill(null).map(() => generateRandomEmail("agent"));
    const initialLoanOfficerEmails = Array(3).fill(null).map(() => generateRandomEmail("loanOfficer"));
    const initialNormiesEmails = Array(2).fill(null).map(() => generateRandomEmail("people"));

    const formik = useFormik({
        initialValues: {
            address: '',
            buyersEmails: [userProfile.email],
            buyerAgentsEmails: initialAgentEmails,
            sellersEmails: initialNormiesEmails,
            sellerAgentsEmails: initialAgentEmails,
            loanOfficersEmails: initialLoanOfficerEmails,
            forms: [documentnames.FORM21, documentnames.FORM22A],
        },
        onSubmit: values => {
            dispatch(createProjectGroup(values,
                (newprojectGroupID) => {
                    navigate(`/project_details/${newprojectGroupID}`)
                } )
            )

            onSubmit(values);
        },
    });

    const handleEmailChange = (e, index, field) => {
        const emails = [...formik.values[field]];
        emails[index] = e.target.value;
        formik.setFieldValue(field, emails);
    };

    const addEmailField = (field) => {
        const emails = [...formik.values[field], ''];
        formik.setFieldValue(field, emails);
    };

    const removeEmailField = (index, field) => {
        const emails = formik.values[field].filter((_, idx) => idx !== index);
        formik.setFieldValue(field, emails);
    };

    return (
        <Form onSubmit={formik.handleSubmit} style={{fontFamily: 'Roboto, sans-serif'}}>
            <FormGroup row>
                <Label for="address" sm={2}>Address</Label>
                <Col sm={10}>
                    <Input
                        id="address"
                        name="address"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                    />
                </Col>
            </FormGroup>
            {/* Render email fields and form fields */}
            {['buyersEmails', 'buyerAgentsEmails', 'sellersEmails', 'sellerAgentsEmails', 'loanOfficersEmails'].map((field) => (
                <FormGroup row key={field}>
                    <Label sm={2}>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                    <Col sm={10}>
                        {formik.values[field].map((email, index) => (
                            <div key={index} className="mb-2">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => handleEmailChange(e, index, field)}
                                />
                                {index > 0 && (
                                    <Button color="danger" onClick={() => removeEmailField(index, field)}
                                            className="mt-2">
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button color="primary" onClick={() => addEmailField(field)} className="mt-2">
                            Add Email
                        </Button>
                    </Col>
                </FormGroup>
            ))}
            <Button type="submit" color="success">Submit</Button>
        </Form>
    );
};

export default CreateGroupForm;

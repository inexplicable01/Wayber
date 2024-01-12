import React from 'react';
import CreateGroupForm from './CreateGroupForm';
import {Col, Container, Row} from "reactstrap";


const CreateGroup = () => {

    const handleFormSubmit = (formValues) => {
        // createProjectGroup(formValues)
        console.log('Form Values:', formValues);
        // Process form submission here (e.g., send to a server)
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <div>
                        <h1>Create Project Group</h1>
                        <CreateGroupForm onSubmit={handleFormSubmit}/>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CreateGroup;

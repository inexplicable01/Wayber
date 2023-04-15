import React from 'react';
import { Container } from 'reactstrap';
import Section from './Section';


const ProjectOverview = () => {
  document.title="Project Overview | Velzon - " + process.env.APPNAME_TITLE;

    return (
        <React.Fragment>
            <div className="page-content">                
                <Container fluid>                    
                <Section />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectOverview;
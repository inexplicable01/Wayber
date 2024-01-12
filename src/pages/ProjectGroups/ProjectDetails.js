import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllProjectGroups, createProjectGroup} from '../../store/projectgroup/actions';
// import {Col, Container, Row} from "reactstrap";
import {useNavigate, useParams, Link} from 'react-router-dom';
import {Col, Row, Card, Container, CardBody, CardTitle, ListGroup, ListGroupItem} from 'reactstrap';
import ProjectDetailCard from './ProjectDetailCard'

const ProjectDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const projectGroup = useSelector(state => state.projectgroupreducer.projectGroup);


    // Need to not use the id to make call to populate
    console.log(projectGroup)

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <ProjectDetailCard projectGroup={projectGroup}/>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectDetails;

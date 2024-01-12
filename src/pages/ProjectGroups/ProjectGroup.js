import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllProjectGroups, createProjectGroup, readProjectGroup} from '../../store/projectgroup/actions';
import {Col, Container, Row} from "reactstrap";
import {useNavigate} from 'react-router-dom';
import projectgroupreducer from "../../store/projectgroup/reducer";
import {useProfile} from "../../Components/Hooks/UserHooks";
import ProjectDetailCard from "./ProjectDetailCard";
const ProjectGroupsComponent = () => {
    const dispatch = useDispatch();
    // const { id } = useParams();
    // const projectGroups = useSelector(state => state.projectGroups);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const navigate = useNavigate();
    // const projectGroup = useSelector(state => state.projectgroupreducer.projectGroup);
    const projectGroups = useSelector(state => state.projectgroupreducer.projectGroups);
        const {userProfile} = useProfile()


    useEffect(() => {
        if (userProfile){
            dispatch(readProjectGroup(userProfile.email, userProfile.role));
        }

    }, [dispatch,userProfile]);

    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
    };

    const handleCreateGroup = (newGroupData) => {
        dispatch(createProjectGroup(newGroupData));
    };

    console.log(projectGroups)

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <div>
                        <h2>Your Project Groups</h2>

                        {projectGroups?.map((item, index) => (
                            <div key={index}>
                                <ProjectDetailCard projectGroup={item}/>
                                {/*<h3>Title: {item.id}</h3>*/}
                                {/* More content for each item */}
                            </div>
                        ))}



                        <button onClick={() => navigate('/create-group')}>Create Group</button>

                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ProjectGroupsComponent;

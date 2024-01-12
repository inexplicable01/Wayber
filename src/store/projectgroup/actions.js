import * as actionTypes from './actionTypes';
import {READ_PROJECT_GROUP_BY_ID} from "./actionTypes";

export const createProjectGroup = (projectGroup,onSuccess) => ({
    type: actionTypes.CREATE_PROJECT_GROUP,
    payload: projectGroup,
    onSuccess
});

export const readProjectGroup = (email, userrole) => ({
    type: actionTypes.READ_PROJECT_GROUP,
    payload: {email,userrole},
});

export const readProjectGroupByID = (projectGroupID) => ({
    type: actionTypes.READ_PROJECT_GROUP_BY_ID,
    payload: {projectGroupID},
});

export const updateProjectGroup = (id, projectGroup) => ({
    type: actionTypes.UPDATE_PROJECT_GROUP,
    payload: { id, projectGroup },
});

export const deleteProjectGroup = (id) => ({
    type: actionTypes.DELETE_PROJECT_GROUP,
    payload: id
});

export const projectGroupSuccess = (projectGroupID,projectGroup) => ({
    type: actionTypes.PROJECT_GROUP_SUCCESS,
    projectGroupID:projectGroupID ,
    projectGroup:{projectGroupID:projectGroupID,...projectGroup},
});

export const readProjectGroupSuccess = (projectGroups) => ({
    type: actionTypes.READ_PROJECT_GROUP_SUCCESS,
    projectGroups:projectGroups,
});

export const projectGroupFailure = (error) => ({
    type: actionTypes.PROJECT_GROUP_FAILURE,
    payload: error,
});


export const fetchAllProjectGroups = () => ({
    type: actionTypes.FETCH_ALL_PROJECT_GROUPS,
});
import {call, put, takeLatest, takeEvery} from 'redux-saga/effects';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
// import firebase from "firebase/app";
// import "firebase/firestore";

import {getFirebaseBackend} from "../../helpers/firebase_helper";

function* handleCreateProjectGroup(action) {
    try {
        const firebasebackend = getFirebaseBackend()
        const response = yield call(firebasebackend.createProjectGroup, action.payload);
        yield put(actions.projectGroupSuccess(response, action.payload));
        // Call the onSuccess callback if it exists
        if (action.onSuccess) {
            action.onSuccess(response); // Assuming 'response' contains the project group ID
        }
    } catch (error) {
        yield put(actions.projectGroupFailure(error.message));
    }
}

function* handleReadProjectGroup(action) {
    const {email, userrole} = action.payload
    try {
        let projectGroups = [];
        const firebasebackend = getFirebaseBackend()
        const response = yield call(firebasebackend.getProjectGroup, email, userrole);
        // const queries = [response];
        const projectgroups = [];
        response.forEach(querySnapshot => {
            const data = querySnapshot.data();
            // if (data.buyersEmails.includes(email)) {
            //
            // }
            projectgroups.push({projectGroupID: querySnapshot.id, ...data});
        });
        yield put(actions.readProjectGroupSuccess(projectgroups));
    } catch (error) {
        yield put(actions.projectGroupFailure(error.message));
    }
}


function* getProjectGroupbyId(action) {
    const {projectGroupID} = action.payload
    try {
        const firebasebackend = getFirebaseBackend()
        const response = yield call(firebasebackend.findProjectGroupbyID, projectGroupID);
        const projectgroup = response.data()
        yield put(actions.projectGroupSuccess(projectGroupID,
                {
                    projectGroupID: projectGroupID,
                    ...projectgroup
                }
            )
        );
    } catch (error) {
        yield put(actions.projectGroupFailure(error.message));
    }
}

function* handleFetchAllProjectGroups() {
    try {
        const firebasebackend = getFirebaseBackend()
        const response = yield call(firebasebackend.fetchAllProjectGroups);
        yield put(actions.projectGroupSuccess(response));
    } catch (error) {
        yield put(actions.projectGroupFailure(error.message));
    }
}

// In watchProjectGroupActions


export default function* watchProjectGroupSaga() {
    yield takeEvery(actionTypes.CREATE_PROJECT_GROUP, handleCreateProjectGroup);
    yield takeEvery(actionTypes.READ_PROJECT_GROUP, handleReadProjectGroup);

    yield takeEvery(actionTypes.READ_PROJECT_GROUP_BY_ID, getProjectGroupbyId);
    yield takeEvery(actionTypes.FETCH_ALL_PROJECT_GROUPS, handleFetchAllProjectGroups);
    // Add watchers for UPDATE and DELETE
}

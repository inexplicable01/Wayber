import * as actionTypes from './actionTypes';

const initialState = {
    projectGroups: [],
    projectGroupID: null,
    projectGroup: null,
    error: null
};

const projectgroupreducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROJECT_GROUP_SUCCESS:
            return {
                ...state,
                // projectGroups: action.payload,
                projectGroup: action.projectGroup,
                projectGroupID: action.projectGroupID,
                error: null
            };
        case actionTypes.PROJECT_GROUP_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case actionTypes.READ_PROJECT_GROUP_SUCCESS:
            // console.log(actionTypes.READ_PROJECT_GROUP_SUCCESS, 'reducuer', action.projectGroups)
            return {
                ...state,
                projectGroups: action.projectGroups,
                error: null
            };
        // Handle other cases
        default:
            return state;
    }
};


export default projectgroupreducer;

import {
    FETCH_QUOTES_SUCCESS,
    SAVE_ANNOTATION_REQUEST,
    SAVE_ANNOTATION_SUCCESS,
    SAVE_ANNOTATION_FAILURE,
    FETCH_ANNOTATIONS_SUCCESS,
    FETCH_ANNOTATIONS_FAILURE
} from './actionTypes';

const initialState = {
    quotes: [],
    annotationdocumentid: null,
    xfdfString:null,
};

const quoteReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUOTES_SUCCESS:
            return {...state, quotes: action.payload};
        case SAVE_ANNOTATION_REQUEST:
            // Handle the request action
            return {
                ...state,
                // Update your state as needed
            };
        case SAVE_ANNOTATION_SUCCESS:
            // Handle the success action
            return {
                ...state,
                // Update your state as needed
            };
        case SAVE_ANNOTATION_FAILURE:
            // Handle the failure action
            return {
                ...state,
                // Update your state as needed
            };
        case FETCH_ANNOTATIONS_SUCCESS:
            // Handle successful fetching of annotations
            return {
                ...state,
                xfdfString: action.payload.xfdfString,
                // Other state updates
            };
        case FETCH_ANNOTATIONS_FAILURE:
            // Handle failure in fetching annotations
            return {
                ...state,
                error: action.payload.error,
                // Other state updates
            };
        default:
            return state;
    }
};

export default quoteReducer;

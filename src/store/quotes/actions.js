import * as actionTypes from './actionTypes';

export const fetchQuotesRequest = () => ({
    type: actionTypes.FETCH_QUOTES_REQUEST
});

export const fetchQuotesSuccess = quotes => ({
    type: actionTypes.FETCH_QUOTES_SUCCESS,
    payload: quotes
});

export const addQuoteRequest = (newQuote,userUID) => ({
    type: actionTypes.ADD_QUOTE_REQUEST,
    payload: { newQuote: newQuote, uid: userUID }
});

export const saveAnnotationRequest = (uid, annotationData, formName) => ({
    type: actionTypes.SAVE_ANNOTATION_REQUEST,
    payload: { uid, annotationData , formName}
});

export const saveAnnotationSuccess = () => ({
    type: actionTypes.SAVE_ANNOTATION_SUCCESS
});

export const saveAnnotationFailure = (error) => ({
    type: actionTypes.SAVE_ANNOTATION_FAILURE,
    payload: { error }
});

export const fetchAnnotationsRequest = (formName, uid) => ({
    type: actionTypes.FETCH_ANNOTATIONS_REQUEST,
    payload: { formName, uid }
});

export const fetchAnnotationsSuccess = (xfdfString) => ({
    type: actionTypes.FETCH_ANNOTATIONS_SUCCESS,
    payload: { xfdfString }
});

export const fetchAnnotationsFailure = (error) => ({
    type: actionTypes.FETCH_ANNOTATIONS_FAILURE,
    payload: { error }
});
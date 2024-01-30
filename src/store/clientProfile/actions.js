import * as actionTypes from './actionTypes';

// Action creators for form submission
export const submitForm = (formData) => ({
  type: actionTypes.SUBMIT_FORM,
  payload: formData,
});

export const submitFormSuccess = (data) => ({
  type: actionTypes.SUBMIT_FORM_SUCCESS,
  payload: data,
});

export const submitFormFailure = (error) => ({
  type: actionTypes.SUBMIT_FORM_FAILURE,
  payload: error,
});



// Action creators for form submission status
export const initiateFormSubmission = () => ({
  type: actionTypes.INITIATE_FORM_SUBMISSION,
});

export const formSubmissionInProgress = () => ({
  type: actionTypes.FORM_SUBMISSION_IN_PROGRESS,
});

export const formSubmissionCompleted = () => ({
  type: actionTypes.FORM_SUBMISSION_COMPLETED,
});

export const formSubmissionError = (error) => ({
  type: actionTypes.FORM_SUBMISSION_ERROR,
  payload: error,
});

// Action creator for resetting the form
export const resetFormFields = () => ({
  type: actionTypes.RESET_FORM_FIELDS,
});

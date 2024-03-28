import * as actionTypes from "./actionTypes";

export const fetchProfilesStart = () => ({
    type: actionTypes.FETCH_CLIENT_INFORMATION_START,
  });
  
  export const fetchProfilesSuccess = profiles => ({
    type: actionTypes.FETCH_CLIENT_INFORMATION_SUCCESS,
    payload: profiles,
  });
  
  export const fetchProfilesFailure = error => ({
    type: actionTypes.FETCH_CLIENT_INFORMATION_FAILURE,
    payload: error,
  });
  
  export const deleteClientInformationStart = (clientId) => ({
    type: actionTypes.DELETE_CLIENT_INFORMATION_START,
    payload: clientId,
  });
  
  export const deleteClientInformationSuccess = (clientId) => ({
    type: actionTypes.DELETE_CLIENT_INFORMATION_SUCCESS,
    payload: clientId,
  });
  
  export const deleteClientInformationFailure = (error) => ({
    type: actionTypes.DELETE_CLIENT_INFORMATION_FAILURE,
    payload: error,
  });
  

  export const editClientInformationStart = (clientId, updatedData) => ({
    type: actionTypes.EDIT_CLIENT_INFORMATION_START,
    payload: { clientId, updatedData },
  });
  
  export const editClientInformationSuccess = () => ({
    type: actionTypes.EDIT_CLIENT_INFORMATION_SUCCESS,
  });
  
  export const editClientInformationFailure = (error) => ({
    type: actionTypes.EDIT_CLIENT_INFORMATION_FAILURE,
    payload: error,
  });
  

  export const submitInformation = (formData) => ({
    type: actionTypes.SUBMIT_INFORMATION,
    payload: formData,
  });
  
  export const submitInformationSuccess = (data) => ({
    type: actionTypes.SUBMIT_INFORMATION_SUCCESS,
    payload: data,
  });
  
  export const submitInformationFailure = (error) => ({
    type: actionTypes.SUBMIT_INFORMATION_FAILURE,
    payload: error,
  });
  
  
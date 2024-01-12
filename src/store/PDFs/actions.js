import * as actionTypes from './actionTypes';
export const uploadPdfRequest = (docid, pdfBlob , formName) => ({
  type: actionTypes.UPLOAD_PDF_REQUEST,
  payload:  {docid, pdfBlob , formName}
});

export const uploadPdfSuccess = () => ({
  type: actionTypes.UPLOAD_PDF_SUCCESS,
});

export const uploadPdfFailure = (error) => ({
  type: actionTypes.UPLOAD_PDF_FAILURE,
  error,
});

export const downloadPdfRequest = () => ({
  type: actionTypes.DOWNLOAD_PDF_REQUEST,
});

export const downloadPdfSuccess = (url) => ({
  type: actionTypes.DOWNLOAD_PDF_SUCCESS,
  url,
});

export const downloadPdfFailure = (error) => ({
  type: actionTypes.DOWNLOAD_PDF_FAILURE,
  error,
});
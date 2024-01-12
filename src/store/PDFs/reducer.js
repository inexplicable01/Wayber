import * as actionTypes from './actionTypes';

const initialState = {
  uploadLoading: false,
  downloadLoading: false,
  downloadUrl: null,
  error: null,
    file: null,
};

const PDFReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_PDF_REQUEST:
      return { ...state, uploadLoading: true, error: null };
    case actionTypes.UPLOAD_PDF_SUCCESS:
      return { ...state, uploadLoading: false };
    case actionTypes.UPLOAD_PDF_FAILURE:
      return { ...state, uploadLoading: false, error: action.error };
    case actionTypes.DOWNLOAD_PDF_REQUEST:
      return { ...state, downloadLoading: true, error: null };
    case actionTypes.DOWNLOAD_PDF_SUCCESS:
      return { ...state, downloadLoading: false, downloadUrl: action.url };
    case actionTypes.DOWNLOAD_PDF_FAILURE:
      return { ...state, downloadLoading: false, error: action.error };
    default:
      return state;
  }
};

export default PDFReducer;

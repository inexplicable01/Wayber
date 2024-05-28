
export const setDocToSign = (document) => ({
  type: 'SET_DOC_TO_SIGN',
  payload: document,
});

export const resetDocToSign = () => ({
  type: 'RESET_DOC_TO_SIGN',
});

export const setDocToView = doc => ({
  type: "SET_DOC_TO_VIEW",
  payload: doc
});

export const resetDocToView = () => ({
  type: "RESET_DOC_TO_VIEW"
});
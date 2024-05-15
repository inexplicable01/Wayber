
export const setDocToSign = (document) => ({
  type: 'SET_DOC_TO_SIGN',
  payload: document,
});

export const resetDocToSign = () => ({
  type: 'RESET_DOC_TO_SIGN',
});

import { PROFILE_ERROR,
  PROFILE_SUCCESS,
  EDIT_PROFILE,
  RESET_PROFILE_FLAG,
    SET_PROFILE,
    RESET_USER
} from "./actionTypes"

export const editProfile = user => {
  return {
    type: EDIT_PROFILE,
    payload: { user },
  }
}

export const profileSuccess = msg => {
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
  }
}

export const profileError = error => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  }
}

export const resetProfileFlag = error => {
  return {
    type: RESET_PROFILE_FLAG,
  }
}

export const setProfile = user => {
  return {
    type: SET_PROFILE,
    payload: user,
  };
};

// export const resetProfile = () => {
//   return {
//     type: RESET_USER,
//   };
// };

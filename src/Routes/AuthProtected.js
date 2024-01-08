import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import {setAuthorization} from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../store/actions";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const { userProfile, authChecked  } = useProfile();
  useEffect(() => {
    // if (userProfile && !loading) {
    //   setAuthorization(token);
    // } else
    // console.log('activated',userProfile,', authchecks', authChecked)
    if (!userProfile && authChecked ) {
      dispatch(logoutUser());
    }
  }, [ userProfile, authChecked , dispatch]);

  /*
    Navigate is un-auth access protected routes via url
    */
// console.log('Right Before navc, activated',userProfile,', authchecks', authChecked)
  if (!userProfile && authChecked ) {
    // console.log('WHY', userProfile)
    return (

      <Navigate to={{ pathname: "/landing", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
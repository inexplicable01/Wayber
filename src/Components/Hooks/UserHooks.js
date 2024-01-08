import { useEffect, useState } from "react";
// import { getLoggedinUser } from "../../helpers/api_helper";
import { getFirebaseBackend } from "../../helpers/firebase_helper";
import {useSelector, useDispatch } from "react-redux";
import { setProfile, resetProfileFlag } from "../../store/actions";
// const useProfile = () => {
//   const userProfileSession = getLoggedinUser();
//   var token =
//   userProfileSession &&
//   userProfileSession["token"];
//   const [loading, setLoading] = useState(userProfileSession ? false : true);
//   const [userProfile, setUserProfile] = useState(
//     userProfileSession ? userProfileSession : null
//   );
//
//   useEffect(() => {
//     const userProfileSession = getLoggedinUser();
//     var token =
//       userProfileSession &&
//       userProfileSession["token"];
//     setUserProfile(userProfileSession ? userProfileSession : null);
//     setLoading(token ? false : true);
//   }, []);
//
//
//   return { userProfile, loading,token };
// };

const useProfile = () => {
  const [authChecked , setAuthChecked ] = useState(false);
  // const [userProfile, setUserProfile] = useState(null);
  const userProfile = useSelector((state) => state.Profile.user);
  const dispatch = useDispatch();
  // const [userProfile]

  useEffect(() => {
    const firebaseBackend = getFirebaseBackend();
    const unsubscribe = firebaseBackend.onAuthStateChanged((authUser) => {
      // console.log("Auth state changed:", authUser); // Log auth state change
      if (authUser) {
        // Fetch user profile from Firestore
        // console.log("authUser:", authUser);
        firebaseBackend.getUserProfile(authUser.uid).then((userProfile) => {
          // console.log("Fetched user profile:", userProfile); // Log fetched user profile
          dispatch(setProfile({ ...authUser, ...userProfile,uid:authUser.uid }));
          setAuthChecked(true);
        });
      } else {
        // console.log("No authUser"); // Log when there's no authUser
        dispatch(resetProfileFlag());
        setAuthChecked(true);
      }
    });

    // Clean up the listener
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return { userProfile, authChecked  };
};

export { useProfile };
// hooks/useReduxData.js
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchApiDataRequest,
  fetchProfilesStart,
  getVendorProfileRequest,
} from "../../../store/createContact/actions";

const useReduxData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetailsData = useSelector((state) => state.textUploadReducer);
  const [clientProfiles, setClientProfiles] = useState([]);
  const [address, setAddress] = useState();
  const [zpidDeatils, setZpidDetails] = useState();

  useEffect(() => {
    dispatch(fetchApiDataRequest());
    dispatch(fetchProfilesStart());
    dispatch(getVendorProfileRequest());
  }, [dispatch]);

  useEffect(() => {
    if (userDetailsData?.userZPID?.success) {
      setZpidDetails(userDetailsData.userZPID?.details);
    }
    if (userDetailsData?.firebase?.profiles) {
      setClientProfiles(userDetailsData);
    }
  }, [userDetailsData?.userZPID, userDetailsData?.firebase?.profiles]);

  useEffect(() => {
    if (userDetailsData.api?.success) {
      setAddress(userDetailsData.api.data);
    }
  }, [userDetailsData.api]);

  return {
    userDetailsData,
    clientProfiles,
    address,
    dispatch,
    navigate,
    zpidDeatils,
  };
};

export default useReduxData;

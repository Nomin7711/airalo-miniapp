import "./App.css";

import { useHpsUserLogin } from "@airalo/api/useHpsUserLogin";
import {
  airaloSelector,
  fetchUserAiralo,
} from "@airalo/redux/slices/mainSlice";
import { AiraloRoutes } from "@airalo/router";
import Loader from "@components/Loader";
import { setTokenAiralo } from "@config/apiClient";
import { colors } from "@constants/colors";
import { CircularProgress } from "@mui/material";
import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderRoutes } from "react-router-config";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { isAuthorized, userAiralo } = useSelector(airaloSelector.getMain);
  const dispatch = useDispatch();
  const { mutateAsync, isLoading } = useHpsUserLogin();
  useEffect(() => {
    handleToken();
  }, []);
  const query = queryString.parse(window.location.search, {
    parseBooleans: true,
  });

  const handleToken = async () => {
    let tempAuthCode = localStorage.getItem("authCode");
    if (
      query?.authCode &&
      query?.authCode !== "undefined" &&
      query?.authCode?.length > 1
    ) {
      tempAuthCode = query?.authCode;
      localStorage.setItem("authCode", tempAuthCode);
    }
    try {
      const result = await mutateAsync({
        authorization_code: tempAuthCode,
      });
      if (result?.code === 1) {
        setTokenAiralo(result?.token);
        dispatch(fetchUserAiralo());
      }
    } catch (error) {
      console.error("An error occurred");
      console.log(error);
    }
  };
  return (
    <Router>
      {isAuthorized ? (
        renderRoutes(AiraloRoutes)
      ) : (
        <Loader visible={true} color={colors.primary} />
      )}
    </Router>
  );
}

export default App;

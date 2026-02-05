import "./App.css";

import Loader from "@components/Loader";
import { setTokenTravelsim } from "@config/apiClient";
import { colors } from "@constants/colors";
import { useHpsTraveilsimLogin } from "@travelsim/api/useHpsTraveilsimLogin";
import {
  fetchUserTravelsim,
  travelsimSelectors,
} from "@travelsim/redux/slices/mainSlice";
import { MainRoutes } from "@travelsim/router";
import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderRoutes } from "react-router-config";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { isAuthorized, userTravelsim } = useSelector(
    travelsimSelectors.getMain
  );
  const { mutateAsync, isLoading } = useHpsTraveilsimLogin();
  const query = queryString.parse(window.location.search, {
    parseBooleans: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    handleToken();
  }, []);

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
        setTokenTravelsim(result?.token);
        dispatch(fetchUserTravelsim());
      }
    } catch (error) {
      console.error("An error occurred");
      console.log(error);
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  return (
    <Router>
      {isAuthorized ? (
        renderRoutes(MainRoutes)
      ) : (
        <Loader visible={true} color={colors.primary} />
      )}
    </Router>
  );
}

export default App;

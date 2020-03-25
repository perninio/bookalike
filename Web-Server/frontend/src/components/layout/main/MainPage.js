import React from "react";

import { useSelector } from "react-redux";
import { LandingPage } from "./LandingPage";
import { UserDashboard } from "../user/UserDashboard";
import { UserDashboard2 } from "../user/UserDashboard2";//mocup

export const MainPage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return isAuthenticated ? <UserDashboard2 /> : <LandingPage />;
};

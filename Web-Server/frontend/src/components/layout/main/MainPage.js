import React from "react";

import { useSelector } from "react-redux";
import { LandingPage } from "./LandingPage";
import { UserDashboard } from "../user/UserDashboard";

export const MainPage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return isAuthenticated ? <UserDashboard /> : <LandingPage />;
};

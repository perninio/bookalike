import React from "react";

import { useSelector } from "react-redux";
import { LandingPage } from "./LandingPage";
import { Dashboard } from "../user/Dashboard";

export const MainPage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return isAuthenticated ? <Dashboard /> : <LandingPage />;
};

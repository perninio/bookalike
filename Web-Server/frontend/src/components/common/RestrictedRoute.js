import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { role } = useSelector(state => state.auth.user);

  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        } else if (
          isAuthenticated &&
          (role === "admin" || role === "moderator")
        ) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

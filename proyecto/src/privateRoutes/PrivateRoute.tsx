import React from "react";
import { Route, Link } from "react-router-dom";

export const PrivateRoute = ({
  children,
  ...rest
}: {
  children: any;
  rest: any;
}) => {
  const authenticated = false;
  <Route {...rest}>{!authenticated ? <Link to="/login" /> : children}</Route>;
};

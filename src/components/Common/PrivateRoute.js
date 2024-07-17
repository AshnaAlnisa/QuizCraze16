// src/components/Common/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('currentUser')) !== null;

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  return token ? (
    <Element />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const PrivateRoute = ( { children }) => {
  const { currentUser } = useAppContext();

  return (
    currentUser ? children : <Navigate to='/login' />
  )
}

export default PrivateRoute;

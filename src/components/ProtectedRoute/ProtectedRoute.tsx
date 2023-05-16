import { Navigate, Outlet } from 'react-router-dom';
import { NavigationBar } from '../NavigationBar/NavigationBar';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from '../../firebase';

export const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        setAuthState(true);
        setLoading(false);
      } else {
        setAuthState(false);
        setLoading(false);
      }
    });

    return () => {
      subscribe();
    };
  }, []);

  if (loading) {
    return null;
  }
  return authState ? (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  ) : (
    <Navigate replace to='/login' />
  );
};

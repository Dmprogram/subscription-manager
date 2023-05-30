import React from 'react';
import { FormAuthorization } from '../FormAuthorization/FormAuthorization';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useState } from 'react';

export const SignIn = () => {
  const [authError, setAuthError] = useState(null);

  const navigate = useNavigate();
  const handleLogin = (
    values: { email: string; password: string },
    setFieldValue: (field: string, value: string, shouldValidate: boolean) => void
  ) => {
    const { email, password } = values;
    console.log(authError);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === 'auth/user-not-found') {
          setAuthError('User not found');
          setFieldValue('password', '', true);
        }
        if (error.code === 'auth/wrong-password') {
          setAuthError('Wrong password');
          setFieldValue('password', '', true);
        }
        if (error.code === 'auth/too-many-requests') {
          setAuthError('Please try later, too many attempts');
          setFieldValue('password', '', true);
        }
      });
  };
  return (
    <FormAuthorization
      submitTitle='Sign In'
      handleSubmit={handleLogin}
      authError={authError}
      setAuthError={setAuthError}
    />
  );
};

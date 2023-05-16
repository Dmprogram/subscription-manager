import React from 'react';
import { Form } from '../FormAuthorization/FormAuthorization';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

export const SignIn = () => {
  const navigate = useNavigate();
  const handleLogin = (ev: React.FormEvent, email: string, password: string) => {
    ev.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <Form submitTitle='Sign In' handleClick={handleLogin} />;
};

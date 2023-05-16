import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Form } from '../FormAuthorization/FormAuthorization';
import { auth } from '../../firebase';

export const SignUp = () => {
  const navigate = useNavigate();
  const handleRegister = (ev: React.FormEvent, email: string, password: string) => {
    ev.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/'))
      .catch(console.error);
  };
  return <Form submitTitle='Sign Up' handleClick={handleRegister} />;
};

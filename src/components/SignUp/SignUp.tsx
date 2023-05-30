import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FormAuthorization } from '../FormAuthorization/FormAuthorization';
import { auth } from '../../firebase';

export const SignUp = () => {
  const navigate = useNavigate();
  const handleRegister = (values) => {
    const { email, password } = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/'))
      .catch(console.error);
  };
  return <FormAuthorization submitTitle='Sign Up' handleSubmit={handleRegister} />;
};

import { FC, useState } from 'react';
import classes from './FormAuthorization.module.css';

interface FormProps {
  submitTitle: string;
  handleClick: (ev: React.FormEvent, email: string, password: string) => void;
}

export const Form: FC<FormProps> = ({ submitTitle, handleClick }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <form onSubmit={(ev) => handleClick(ev, email, password)}>
      <label htmlFor='email'>Email</label>
      <input
        className={classes.input}
        type='email'
        name='email'
        id='email'
        placeholder='john@example.com'
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      ></input>
      <label htmlFor='password'>Password</label>
      <input
        className={classes.input}
        type='password'
        name='password'
        id='password'
        placeholder='********'
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      ></input>
      <input
        className={classes.inputSubmit}
        onClick={(ev) => handleClick(ev, email, password)}
        type='submit'
        value={submitTitle}
      />
    </form>
  );
};

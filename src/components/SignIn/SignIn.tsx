import classes from './SignIn.module.css';
import { Link } from 'react-router-dom';
export const SignIn = () => {
  return (
    <section className={classes.container}>
      <h1 className={classes.header}>Sign In to Subscription manager</h1>
      <div className={classes.description}>Quick & Simple way to monitor your subscriptions</div>
      <form className={classes.form}>
        <label htmlFor='email'>Email</label>
        <input
          className={classes.input}
          type='email'
          name='email'
          id='email'
          placeholder='john@example.com'
        ></input>
        <label htmlFor='password'>Password</label>
        <input
          className={classes.input}
          type='password'
          name='password'
          id='password'
          placeholder='********'
        ></input>
        <input type='submit' value='Log in' className={classes.inputSubmit} />
      </form>
      <div className={classes.registration}>
        <span>Don't have an account? </span>
        <Link to='/registration' className={classes.link}>
          Create new account
        </Link>
      </div>
    </section>
  );
};

import { SignIn } from '../SignIn/SignIn';
import classes from '../FormAuthorization/FormAuthorization.module.css';
import { Link } from 'react-router-dom';
export const SignInPage = () => {
  return (
    <section className={classes.container}>
      <h1 className={classes.header}>Sign In to Subscription manager</h1>
      <div className={classes.description}>Quick & Simple way to monitor your subscriptions</div>
      <SignIn />
      <div className={classes.registration}>
        <span>Don't have an account? </span>
        <Link to='/registration' className={classes.link}>
          Create new account
        </Link>
      </div>
    </section>
  );
};

import { SignUp } from '../SignUp/SignUp';
import classes from '../FormAuthorization/FormAuthorization.module.css';
export const SignUppage = () => {
  return (
    <section className={classes.container}>
      <div className={classes.form}>
        <div className={classes.formContent}>
          <h1 className={classes.header}>Sign Up to Subscription manager</h1>
          <div className={classes.description}>
            Quick & Simple way to monitor your subscriptions
          </div>
          <SignUp />
        </div>
      </div>
    </section>
  );
};

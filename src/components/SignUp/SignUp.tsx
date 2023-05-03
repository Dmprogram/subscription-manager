import classes from './SignUp.module.css';
export const SignUp = () => {
  return (
    <section className={classes.container}>
      <h1 className={classes.header}>Sign Up to Subscription manager</h1>
      <div className={classes.description}>Quick & Simple way to monitor your subscriptions</div>
      <form className={classes.form}>
        <label htmlFor='name'>First name</label>
        <input
          className={classes.input}
          type='text'
          name='name'
          id='name'
          placeholder='John'
        ></input>
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
        <input type='submit' value='CREATE AN ACCOUNT' className={classes.inputSubmit} />
      </form>
    </section>
  );
};

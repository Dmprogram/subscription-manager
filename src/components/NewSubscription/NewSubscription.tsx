import classes from './NewSubscription.module.css';
import { Link } from 'react-router-dom';
import { DatePick } from '../DatePicker/DatePicker';
export const NewSubscription = () => {
  return (
    <section className={classes.container}>
      <h2 className={classes.header}>New Subscription</h2>
      <form className={classes.form}>
        <label htmlFor='name'>Name</label>
        <input className={classes.input} type='text' name='name' id='name' placeholder='Spotify' />
        <label htmlFor='price'>Price</label>
        <input className={classes.input} type='text' name='price' id='price' placeholder='200' />
        <div>Next payment</div>
        <DatePick />
        <label htmlFor='currency'>Currency</label>
        <input
          className={classes.input}
          type='text'
          name='currency'
          id='currency'
          placeholder='USD, EUR, RUB'
        />
        <label htmlFor='frequency'>Payment frequency</label>
        <select className={classes.input} id='frequency' required>
          <option>once a month</option>
          <option>once a year</option>
        </select>
        <Link to='/subscriptions' className={classes.inputSubmitLink}>
          <input type='submit' value='Add new subscription' className={classes.inputSubmit} />
        </Link>
      </form>
    </section>
  );
};

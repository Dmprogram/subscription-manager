import classes from './EditSubscription.module.css';
import { Link } from 'react-router-dom';
import { DatePick } from '../DatePicker/DatePicker';
import cancel from '../../assets/cancel.png';
export const EditSubscription = () => {
  return (
    <section className={classes.container}>
      <h2 className={classes.header}>Edit your subscription</h2>
      <form className={classes.form}>
        <label htmlFor='name'>Name</label>
        <input
          className={classes.input}
          type='text'
          name='name'
          id='name'
          placeholder='Spotify'
          value='Spotify'
        />
        <label htmlFor='price'>Price</label>
        <input
          className={classes.input}
          type='text'
          name='price'
          id='price'
          placeholder='200'
          value='200'
        />
        <div>Next payment</div>
        <DatePick />
        <label htmlFor='currency'>Currency</label>
        <input
          className={classes.input}
          type='text'
          name='currency'
          id='currency'
          placeholder='USD, EUR, RUB'
          value='USD'
        />
        <label htmlFor='frequency'>Payment frequency</label>
        <select className={classes.input} id='frequency' required>
          <option>once a month</option>
          <option>once a year</option>
        </select>
        <Link to='/subscriptions' className={classes.inputSubmitLink}>
          <input type='submit' value='Edit your subscription' className={classes.inputSubmit} />
        </Link>
        <Link to='/subscriptions' className={classes.deleteSubsciptionLink}>
          <div className={classes.deleteSubscription}>
            <img src={cancel} alt='cancel' className={classes.cancel} />
            <span>Cancel Subscription</span>
          </div>
        </Link>
      </form>
    </section>
  );
};

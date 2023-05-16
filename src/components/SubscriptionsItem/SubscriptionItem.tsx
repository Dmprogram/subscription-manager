import { Link } from 'react-router-dom';
import classes from './SubscriptionItem.module.css';
import applicationIcon from '../../assets/applicationIcon.png';
import calendar from '../../assets/calendar.png';
import money from '../../assets/money.png';
import edit from '../../assets/edit.png';

export const SubscriptionItem = (props) => {
  const currencies = { RUB: '₽', EUR: '€', GBP: '£', USD: '$' };

  const { date, name, price, currency, id } = props;
  const { year, month, day } = date;
  return (
    <div className={classes.payment}>
      <div>
        <div className={classes.paymentTitle}>
          <img src={applicationIcon} alt='icon' className={classes.applicationIcon} />
          <span>{name}</span>
        </div>
        <div className={classes.paymentDate}>
          <img src={calendar} alt='date' className={classes.dateIcon} />
          <span>
            Payment date - {day} {month} {year}
          </span>
        </div>
        <div className={classes.paymentValue}>
          <img src={money} alt='money' className={classes.moneyIcon} />
          <span>
            {price} {currencies[currency]}
          </span>
        </div>
      </div>
      <div className={classes.paymentManage}>
        <img src={edit} alt='edit' className={classes.editIcon} />
        <Link to={`/edit-subscription/${id}`} className={classes.link}>
          <div className={classes.paymentManage}>Edit & Details</div>
        </Link>
      </div>
    </div>
  );
};

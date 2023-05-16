import classes from './UpcomingPaymentsItem.module.css';
import applicationIcon from '../../assets/applicationIcon.png';
import calendar from '../../assets/calendar.png';
import money from '../../assets/money.png';

export const UpcomingPaymentsItem = (props) => {
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
      </div>
      <div className={classes.paymentValue}>
        <img src={money} alt='money' className={classes.moneyIcon} />
        {price} {currencies[currency]}
      </div>
    </div>
  );
};

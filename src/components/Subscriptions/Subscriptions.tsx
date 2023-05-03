import classes from './Subscriptions.module.css';
import { Link } from 'react-router-dom';
import applicationIcon from '../../assets/applicationIcon.png';
import calendar from '../../assets/calendar.png';
import money from '../../assets/money.png';
export const Subscriptions = () => {
  return (
    <section className={classes.payments}>
      <header className={classes.header}>
        <h3 className={classes.paymentsTitle}>ALL SUBSCRIPTIONS</h3>
        <Link to='/new-subscription' className={classes.link}>
          Add new subscription
        </Link>
      </header>
      <div className={classes.payment}>
        <div>
          <div className={classes.paymentTitle}>
            <img src={applicationIcon} alt='icon' className={classes.applicationIcon} />
            <span>Yandex</span>
          </div>
          <div className={classes.paymentDate}>
            <img src={calendar} alt='date' className={classes.dateIcon} />
            <span>Payment date - 22 May 2023</span>
          </div>
          <div className={classes.paymentValue}>
            <img src={money} alt='money' className={classes.moneyIcon} />
            <span>123 Р</span>
          </div>
        </div>
        <Link to='/edit-subscription' className={classes.link}>
          <div className={classes.paymentManage}>Edit & Details</div>
        </Link>
      </div>
      <div className={classes.payment}>
        <div>
          <div className={classes.paymentTitle}>
            <img src={applicationIcon} alt='icon' className={classes.applicationIcon} />
            <span>Yandex</span>
          </div>
          <div className={classes.paymentDate}>
            <img src={calendar} alt='date' className={classes.dateIcon} />
            <span>Payment date - 22 May 2023</span>
          </div>
          <div className={classes.paymentValue}>
            <img src={money} alt='money' className={classes.moneyIcon} />
            <span>123 Р</span>
          </div>
        </div>
        <Link to='/edit-subscription' className={classes.link}>
          <div className={classes.paymentManage}>Edit & Details</div>
        </Link>
      </div>
      <div className={classes.payment}>
        <div>
          <div className={classes.paymentTitle}>
            <img src={applicationIcon} alt='icon' className={classes.applicationIcon} />
            <span>Yandex</span>
          </div>
          <div className={classes.paymentDate}>
            <img src={calendar} alt='date' className={classes.dateIcon} />
            <span>Payment date - 22 May 2023</span>
          </div>
          <div className={classes.paymentValue}>
            <img src={money} alt='money' className={classes.moneyIcon} />
            <span>123 Р</span>
          </div>
        </div>
        <Link to='/edit-subscription' className={classes.link}>
          <div className={classes.paymentManage}>Edit & Details</div>
        </Link>
      </div>
    </section>
  );
};

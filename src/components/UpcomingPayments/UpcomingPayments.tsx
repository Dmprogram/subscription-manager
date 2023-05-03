import classes from './UpcomingPayments.module.css';
import applicationIcon from '../../assets/applicationIcon.png';
import calendar from '../../assets/calendar.png';
import money from '../../assets/money.png';
export const UpcomingPayments = () => {
  return (
    <section className={classes.payments}>
      <h3 className={classes.paymentsTitle}>UPCOMING PAYMENTS</h3>
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
        </div>
        <div className={classes.paymentValue}>
          <img src={money} alt='money' className={classes.moneyIcon} />
          123 Р
        </div>
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
        </div>
        <div className={classes.paymentValue}>
          <img src={money} alt='money' className={classes.moneyIcon} />
          123 Р
        </div>
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
        </div>
        <div className={classes.paymentValue}>
          <img src={money} alt='money' className={classes.moneyIcon} />
          123 Р
        </div>
      </div>
    </section>
  );
};

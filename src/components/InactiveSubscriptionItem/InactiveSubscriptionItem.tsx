import { Link } from 'react-router-dom';
import classes from './InactiveSubscriptionItem.module.css';
import applicationIcon from '../../assets/applicationIcon.png';
import calendar from '../../assets/calendar.png';
import money from '../../assets/money.png';
import edit from '../../assets/edit.png';
import { formatExpenses } from '../utils/formatExpenses';
import { formatDate } from '../utils/formatDate';
import { useState } from 'react';
import { SwitchSubscriptionStatus } from '../SwitchSubscriptionStatus/SwitchSubscriptionStatus';

export const InactiveSubscriptionItem = (props) => {
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  const onLoad = () => {
    setIsLoadedImage(true);
  };

  const { date, name, price, currency, id, paymentFrequency, imageUrl, status } = props;
  const formatFrequency =
    paymentFrequency === 'once a year' ? 'annually' : 'once a month' ? 'monthly' : '';
  const { year, month, day } = date;

  const { formatDay, formatMonth } = formatDate(year, month, day);
  return (
    <div className={classes.payment}>
      <div>
        <div className={classes.paymentTitle}>
          {imageUrl ? (
            <div className={classes.imageContainer}>
              {isLoadedImage ? null : <div className={classes.loader}></div>}
              <img
                src={imageUrl}
                alt='icon'
                className={classes.imageIcon}
                onLoad={onLoad}
                style={isLoadedImage ? {} : { display: 'none' }}
              />
            </div>
          ) : (
            <img src={applicationIcon} alt='icon' className={classes.applicationIcon} />
          )}
          <span>{name}</span>
        </div>
        <div className={classes.paymentValue}>
          <img src={money} alt='money' className={classes.moneyIcon} />
          <span>
            {formatExpenses(price, currency)} ({formatFrequency})
          </span>
        </div>
        <div className={classes.paymentDate}>
          <img src={calendar} alt='date' className={classes.dateIcon} />
          <span>
            Next payment - {formatDay} {formatMonth} {year}
          </span>
        </div>
      </div>
      <div className={classes.paymentManage}>
        <div className={classes.editContainer}>
          <img src={edit} alt='edit' className={classes.editIcon} />
          <Link to={`/edit-subscription/${id}`} className={classes.link}>
            Edit & Details
          </Link>
        </div>
        <div className={classes.switch}>
          <SwitchSubscriptionStatus id={id} status={status} />
        </div>
      </div>
    </div>
  );
};

import classes from './AverageBoard.module.css';
import { Link } from 'react-router-dom';

export const AverageBoard = () => {
  return (
    <header className={classes.header}>
      <h2 className={classes.title}>AVERAGE MONTHLY EXPENSES</h2>
      <footer className={classes.footer}>
        <div className={classes.money}>3545 Р</div>
        <Link to='/subscriptions' className={classes.link}>
          <span>ALL SUBSCRIPTIONS</span>
          <div className={classes.arrowRight}></div>
        </Link>
      </footer>
    </header>
  );
};

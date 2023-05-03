import classes from './NavigationBar.module.css';
import { NavLink } from 'react-router-dom';

export const NavigationBar = () => {
  return (
    <nav className={classes.container}>
      <div className={classes.links}>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}
        >
          <span>Sign out</span>
        </NavLink>
        <NavLink
          to='/registration'
          className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}
        >
          <span>Sign up</span>
        </NavLink>
        <NavLink
          to='/home'
          className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}
        >
          <span>Main Page</span>
        </NavLink>
        <NavLink
          to='/subscriptions'
          className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}
        >
          <span>Subscriptions</span>
        </NavLink>
        <NavLink
          to='/new-subscription'
          className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}
        >
          <span>Add subscription</span>
        </NavLink>
      </div>
    </nav>
  );
};

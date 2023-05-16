import classes from './NavigationBar.module.css';
import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export const NavigationBar = () => {
  return (
    <nav className={classes.container}>
      <NavLink to='/' className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}>
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
      <NavLink onClick={() => signOut(auth)} to='/login' className={classes.link}>
        <span>Sign out</span>
      </NavLink>
    </nav>
  );
};

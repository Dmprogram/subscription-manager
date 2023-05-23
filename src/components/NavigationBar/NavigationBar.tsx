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
        to='/active-subscriptions'
        className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}
      >
        <span>Active Subscriptions</span>
      </NavLink>
      <NavLink
        to='/inactive-subscriptions'
        className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}
      >
        <span>Inactive Subscriptions</span>
      </NavLink>
      <NavLink
        to='/new-subscription'
        className={({ isActive }) => (isActive ? classes.linkActive : classes.link)}
      >
        <span>Add subscription</span>
      </NavLink>

      <NavLink
        onClick={() => {
          signOut(auth)
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });
        }}
        to='/login'
        className={classes.link}
      >
        <span>Sign out</span>
      </NavLink>
    </nav>
  );
};

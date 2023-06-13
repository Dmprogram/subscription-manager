import classes from './SearchSubscription.module.css';
import searchIcon from '..//../assets/searchIcon.png';
import cross from '..//../assets/crossLight.png';
import { useAppDispatch } from '../../hooks/ReduxHooks';
import { useAppSelector } from '../../hooks/ReduxHooks';
import { findSubscription, clearSearchAndSortFields } from '../store/subscriptionsListSlice';
import { useEffect } from 'react';
import { fetchSubscriptionsList } from '../store/subscriptionsListSlice';
export const SearchSubscription = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSubscriptionsList());

    return () => {
      dispatch(clearSearchAndSortFields());
    };
  }, []);

  const { inputSearch } = useAppSelector((state) => state.subscriptionsList);
  return (
    <div className={classes.searchField}>
      <label htmlFor='search' className={classes.searchTitle}>
        FIND YOUR SUBSCRIPTION
      </label>
      <div className={classes.inputField}>
        <img src={searchIcon} alt='search' className={classes.searchIcon} />
        <input
          className={classes.input}
          type='text'
          name='search'
          id='search'
          placeholder='Netflix, Youtube, Spotify...etc'
          value={inputSearch}
          onChange={(ev) => dispatch(findSubscription({ inputSearch: ev.target.value }))}
        />
        <img
          src={cross}
          alt='cross'
          className={classes.crossIcon}
          onClick={() => dispatch(clearSearchAndSortFields())}
        />
      </div>
    </div>
  );
};

import classes from './SearchSubscription.module.css';
import searchIcon from '..//../assets/searchIcon.png';
import cross from '..//../assets/crossLight.png';
export const SearchSubscription = () => {
  return (
    <form className={classes.searchField}>
      <label htmlFor='search'>FIND YOUR SUBSCRIPTION</label>
      <div className={classes.inputField}>
        <img src={searchIcon} alt='search' className={classes.searchIcon} />
        <input
          className={classes.input}
          type='text'
          name='search'
          id='search'
          placeholder='Netflix, Youtube, Spotify...etc'
        />
        <img src={cross} alt='cross' className={classes.crossIcon} />
      </div>
    </form>
  );
};

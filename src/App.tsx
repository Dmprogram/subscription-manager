import classes from './App.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignInPage } from './components/Pages/SignInPage';
import { SignUppage } from './components/Pages/SignUpPage';
import { MainPage } from './components/Pages/MainPage';
import { SubscriptionsPage } from './components/Pages/SubscriptionsPage';
import { NewSubscriptionPage } from './components/Pages/NewSubscriptionPage';
import { EditSubscriptionPage } from './components/Pages/EditSubscriptionPage';
import { NavigationBar } from './components/NavigationBar/NavigationBar';

const App = () => {
  return (
    <div className={classes.app}>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<SignInPage />} />
          <Route path='/registration' element={<SignUppage />} />
          <Route path='/home' element={<MainPage />} />
          <Route path='/subscriptions' element={<SubscriptionsPage />} />
          <Route path='/new-subscription' element={<NewSubscriptionPage />} />
          <Route path='/edit-subscription' element={<EditSubscriptionPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import classes from './App.module.css';
import { SignInPage } from './components/Pages/SignInPage';
import { SignUppage } from './components/Pages/SignUpPage';
import { MainPage } from './components/Pages/MainPage';
import { ActiveSubscriptionsPage } from './components/Pages/ActiveSubscriptionsPage';
import { NewSubscriptionPage } from './components/Pages/NewSubscriptionPage';
import { EditSubscriptionPage } from './components/Pages/EditSubscriptionPage';
import { InactiveSubscriptionsPage } from './components/Pages/InactiveSubscriptionsPage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Navigate } from 'react-router-dom';

const App = () => {
  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<SignInPage />} />
          <Route path='/registration' element={<SignUppage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<MainPage />} />
            <Route path='/active-subscriptions' element={<ActiveSubscriptionsPage />} />
            <Route path='/inactive-subscriptions' element={<InactiveSubscriptionsPage />} />
            <Route path='/new-subscription' element={<NewSubscriptionPage />} />
            <Route path='/edit-subscription/:subscriptionId' element={<EditSubscriptionPage />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Route>
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

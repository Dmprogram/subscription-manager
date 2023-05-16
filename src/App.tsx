import { BrowserRouter, Routes, Route } from 'react-router-dom';

import classes from './App.module.css';
import { SignInPage } from './components/Pages/SignInPage';
import { SignUppage } from './components/Pages/SignUpPage';
import { MainPage } from './components/Pages/MainPage';
import { SubscriptionsPage } from './components/Pages/SubscriptionsPage';
import { NewSubscriptionPage } from './components/Pages/NewSubscriptionPage';
import { EditSubscriptionPage } from './components/Pages/EditSubscriptionPage';
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
            <Route path='/subscriptions' element={<SubscriptionsPage />} />
            <Route path='/new-subscription' element={<NewSubscriptionPage />} />
            <Route path='/edit-subscription/:subscriptionId' element={<EditSubscriptionPage />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

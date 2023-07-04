import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import classes from './App.module.css'
import { ActiveSubscriptionsPage } from './components/Pages/ActiveSubscriptionsPage'
import { EditSubscriptionPage } from './components/Pages/EditSubscriptionPage'
import { InactiveSubscriptionsPage } from './components/Pages/InactiveSubscriptionsPage'
import { MainPage } from './components/Pages/MainPage'
import { NewSubscriptionPage } from './components/Pages/NewSubscriptionPage'
import { SignInPage } from './components/Pages/SignInPage'
import { SignUppage } from './components/Pages/SignUpPage'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'

const App = () => (
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
)

export default App

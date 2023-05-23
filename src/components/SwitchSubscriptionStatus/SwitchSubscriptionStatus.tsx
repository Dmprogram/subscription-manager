import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/joy';
import Stack from '@mui/joy/Stack/Stack';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { changeStatus } from '../store/subscriptionsListSlice';
import { useAppDispatch } from '../../hooks/ReduxHooks';
import classes from './SwitchSubscriptionStatus.module.css';
export const SwitchSubscriptionStatus = ({ id, status }) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(status);
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    const user = auth.currentUser;
    setChecked(!checked);
    setLoading(true);
    if (user) {
      try {
        await setDoc(
          doc(db, 'users', user.uid, 'subscriptions', id),
          {
            status: !status,
          },
          { merge: true }
        );
      } catch (e) {
        console.error('Error edit subscription: ', e);
      }
      dispatch(changeStatus({ status: !status, id: id }));
      setLoading(false);
    }
  };

  return (
    <FormGroup>
      <Stack direction='row' spacing={0} alignItems='center'>
        <div>{!loading && !checked && 'Inactive'}</div>
        <Switch checked={checked} onChange={handleChange} />
        <div>
          {loading ? (
            <div>
              <div className={classes.loader}></div>
            </div>
          ) : (
            checked && 'Active'
          )}
        </div>
      </Stack>
    </FormGroup>
  );
};

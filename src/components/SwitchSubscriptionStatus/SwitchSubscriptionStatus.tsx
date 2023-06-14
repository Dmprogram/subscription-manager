import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/joy/Stack/Stack';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { changeStatus } from '../store/subscriptionsListSlice';
import { useAppDispatch } from '../../hooks/ReduxHooks';
import classes from './SwitchSubscriptionStatus.module.css';
import { useRef } from 'react';

type SwitchSubscriptionStatus = {
  id: string;
  status: boolean;
};
export const SwitchSubscriptionStatus: React.FC<SwitchSubscriptionStatus> = ({ id, status }) => {
  const windowWidth = useRef(window.innerWidth);
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
        <div className={classes.container}>
          <div>{!loading && !checked && 'Inactive'}</div>
          <Switch
            checked={checked}
            onChange={handleChange}
            size={windowWidth.current < 568 ? 'small' : 'medium'}
          />
          <div>
            {loading ? (
              <div>
                <div className={classes.loader}></div>
              </div>
            ) : (
              checked && 'Active'
            )}
          </div>
        </div>
      </Stack>
    </FormGroup>
  );
};

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export const NotificationEdit = ({ subscriptionEdit, setSubscriptionEdit }) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSubscriptionEdit(false);
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={subscriptionEdit} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='info' sx={{ width: '100%' }}>
          Subscription has been edited!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

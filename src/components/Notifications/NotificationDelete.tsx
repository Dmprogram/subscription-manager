import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

interface NotificationDelete {
  subscriptionDelete: boolean;
  setSubscriptionDelete: (value: boolean) => void;
}

export const NotificationDelete: React.FC<NotificationDelete> = ({
  subscriptionDelete,
  setSubscriptionDelete,
}) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSubscriptionDelete(false);
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={subscriptionDelete} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          Subscription has been deleted!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

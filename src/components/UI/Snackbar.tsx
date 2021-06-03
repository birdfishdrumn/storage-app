import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSnackbarState,
  getSnackbarText,
  getSnackbarType,
  snackbarCloseAction,
} from 'reducks/snackbarSlice';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = useSelector(getSnackbarState);
  const message = useSelector(getSnackbarText);
  const error: any = useSelector(getSnackbarType);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(snackbarCloseAction());
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={7000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {!error ? (
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}

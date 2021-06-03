import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch } from 'react-redux';
import { fullDialogOpenAction } from 'reducks/fullScreenDialogSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        top: 'auto',
        right: 10,
        bottom: 70,
        left: 'auto',
        position: 'fixed',
        zIndex: 999,
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

interface PROPS {
  type: string;
  name: string;
  id?: string;
  placeId?: string;
}

const FloatingActionButtons: React.FC<PROPS> = ({ type, name, id, placeId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab
        onClick={() =>
          dispatch(fullDialogOpenAction({ title: name, type: type, placeId: placeId }))
        }
        color="inherit"
        aria-label="add"
      >
        <AddCircleIcon style={{ fontSize: '40px' }} />
      </Fab>
    </div>
  );
};

export default FloatingActionButtons;

import React from 'react';
import { Text } from 'style/GlobalStyle';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import {
  dialogCloseAction,
  getDialogState,
  getDialogType,
  getDialogTitle,
  getDialogContent,
  getDialogId,
} from 'reducks/dialogSlice';
import { snackbarOpenAction } from 'reducks/snackbarSlice';
import { deleteProduct } from 'reducks/box/operations';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(3),
      width: '100%',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const GlobalDialog: React.FC = ({}) => {
  const open = useSelector(getDialogState);
  const type = useSelector(getDialogType);
  const title = useSelector(getDialogTitle);
  const id = useSelector(getDialogId);
  const content = useSelector(getDialogContent);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(dialogCloseAction());
  };

  const handleDelete = async (id: string): Promise<void> => {
    dispatch(deleteProduct(id));
    handleClose();
    await dispatch(snackbarOpenAction({ text: '作品を削除しました。', type: true }));
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent>
          {type === 'delete' && ' 削除されたデータは復元できません。削除してよろしいですか？'}
        </DialogContent>
        {type === 'delete' && (
          <DialogActions>
            <Button onClick={() => handleDelete(id)} color="primary">
              削除する
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default GlobalDialog;

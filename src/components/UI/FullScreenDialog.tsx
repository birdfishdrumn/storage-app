import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  getFullDialogState,
  getFullDialogTitle,
  getFullDialogType,
  getFullDialogId,
  getFullDialogPlaceId,
  getFullDialogContent,
  fullDialogCloseAction,
} from 'reducks/fullScreenDialogSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AddBox, AddProduct, ProductDetail, BoxDetail } from 'components/Product/index';

export default function ResponsiveDialog() {
  const open = useSelector(getFullDialogState);
  const title = useSelector(getFullDialogTitle);
  const type = useSelector(getFullDialogType);
  const id = useSelector(getFullDialogId) || '';
  const placeId = useSelector(getFullDialogPlaceId);

  const content = useSelector(getFullDialogContent);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(fullDialogCloseAction());
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {type == '商品' && <AddProduct handleClose={handleClose} id={id} />}
          {type == '箱' && <AddBox handleClose={handleClose} placeId={placeId} id={id} />}
          {type == '詳細' && <ProductDetail handleClose={handleClose} id={id} content={content} />}
          {type == '箱の詳細' && <BoxDetail handleClose={handleClose} id={id} content={content} />}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

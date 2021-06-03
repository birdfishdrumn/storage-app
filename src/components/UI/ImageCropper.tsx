import React, { useState, useCallback, memo } from 'react';
import { storage } from 'firebase/index';
import { makeStyles, withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import {
  Typography,
  Box,
  LinearProgress,
  Dialog,
  Divider,
  DialogContent,
  DialogActions,
  Backdrop,
} from '@material-ui/core';
import { EventButton } from 'components/UI/index';
import loadImage from 'blueimp-load-image';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { BoldText } from 'style/GlobalStyle';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ImagePreview from './ImagePreview';

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 0),
    },
    content: {
      padding: 0,
    },
    iconFlex: {
      borderRadius: '50%',
      margin: '10px',
      border: '3px solid #5D99FF',
      justifyContent: 'center',
      display: 'inline-block',
      width: '65px',
      height: '65px',
      background: 'white',
      padding: '7px',
    },
  })
);

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

interface PROPS {
  images: { [key: string]: string }[];
  setImages: React.Dispatch<React.SetStateAction<{ [key: string]: string }[]>>;
  all?: boolean;
}

const UpLoadTest: React.FC<PROPS> = memo(({ images, setImages, all }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [image, setImage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState<number>(100);
  const classes = useStyles(); //Material-ui
  const [cropper, setCropper] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [openCircularProgress, setOpenCircularProgress] = useState<boolean>(false); //処理中みたいモーダル
  // 画像を切り取る前の処理
  const handleImage = (e: any) => {
    setError('');
    try {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader: any = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
      setOpen(true);
      e.target.value = null; //ファイル選択された内容をクリアする（クリアしないと同じファイルが編集できない）
    } catch (e) {
      e.target.value = null;
      setError('画像の切り取りをキャンセルまたは失敗しました');
      setOpen(false);
    }
  };

  const getCropData = async (e: any) => {
    e.preventDefault();
    if (typeof cropper !== 'undefined') {
      //デフォルトのPNGはファイルサイズが大きいのでjpegにする
      let imagedata: any = await cropper.getCroppedCanvas().toDataURL('image/jpeg');
      //console.log(imagedata); //バイナリーが見たい人は出力すると見れます
      // 小さい画像に変換
      const canvas = await loadImage(imagedata, {
        maxWidth: 1000,
        canvas: true,
      });

      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('');

      // アップロード処理
      // @ts-ignore
      canvas.image.toBlob((imagedata) => {
        const storageRef = storage.ref('images/'); //どのフォルダの配下に入れるかを設定
        const imagesRef = storageRef.child(fileName); //ファイル名

        const upLoadTask = imagesRef.put(imagedata);

        setOpenCircularProgress(true);
        upLoadTask.on(
          'state_changed',
          (snapshot) => {
            const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            setProgress(percent);
          },
          (error) => {
            setError('ファイルアップに失敗しました。' + error);
            setProgress(100); //実行中のバーを消す
            setOpen(false);
            setOpenCircularProgress(false);
          },
          () => {
            // setImages("");
            upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              // setImages(downloadURL);
              const newImage = { id: fileName, path: downloadURL };
              setImages((prevState) => [...prevState, newImage]);
              setOpen(false);
              setOpenCircularProgress(false);
            });
          }
        );
      }, 'image/jpeg');
    }
    return;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCircularProgressClose = () => {
    setOpenCircularProgress(false);
  };

  const deleteImage = useCallback(
    async (id) => {
      const ret = window.confirm('この画像を削除しますか？');
      if (!ret) {
        return false;
      } else {
        const newImages = images.filter((image) => image.id !== id);
        setImages(newImages);
        return storage.ref('images/test/').child(id).delete();
      }
    },
    [images]
  );

  return (
    <div>
      <div className={classes.iconFlex}>
        {error && <div>{error}</div>}
        <IconButton style={{ padding: '0px', cursor: 'pointer' }}>
          <label>
            <AddToPhotosIcon style={{ fontSize: '40px' }} />
            <input className="u-display-none" type="file" id="image" onChange={handleImage} />
          </label>
        </IconButton>
      </div>
      <div>
        <div className="p-grid__list-images">
          {images.length > 0 ? (
            images.map((image) => (
              <ImagePreview
                delete={deleteImage}
                id={image.id}
                path={image.path}
                key={image.id}
                all={all}
              />
            ))
          ) : (
            <div className="center border gray">
              <PhotoCameraIcon color="inherit" />
              <BoldText color={'dimgray'}>画像は一枚のみ反映されます。</BoldText>
            </div>
          )}
        </div>
      </div>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        fullScreen={fullScreen}
        maxWidth="xl"
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            画像の切り抜き
          </DialogTitle>

          <Divider />

          <DialogContent className={classes.content}>
            <Cropper
              style={{ height: 450, width: '100%' }}
              initialAspectRatio={1}
              aspectRatio={all ? 3 / 6 : 1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              guides={true}
              minCropBoxHeight={150}
              minCropBoxWidth={150}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
          </DialogContent>

          <Divider />

          <DialogActions>
            <IconButton onClick={getCropData} style={{ padding: '0px', cursor: 'pointer' }}>
              <img
                alt="切り抜く"
                src="https://firebasestorage.googleapis.com/v0/b/fuurin-paint-workshop.appspot.com/o/sozai%2F%E3%81%AF%E3%81%95%E3%81%BF%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3%E7%B4%A0%E6%9D%90%209%20(1).svg?alt=media&token=eb6c19e6-e6c8-476e-873f-129276aae954"
                style={{ width: '50px', marginRight: '10px' }}
              />
            </IconButton>
          </DialogActions>
        </div>
      </Dialog>
      {/* ローディングのダイアログ */}
      <Dialog
        className={classes.modal}
        open={openCircularProgress}
        onClose={handleCircularProgressClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper} style={{ textAlign: 'center' }}>
          <div>Loading</div>
          {progress !== 100 && <LinearProgressWithLabel value={progress} />}
        </div>
      </Dialog>
    </div>
  );
});

function LinearProgressWithLabel(props: any) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
export default UpLoadTest;

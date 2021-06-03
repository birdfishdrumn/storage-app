import React, { ReactEventHandler } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#00CED1',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    height: 36,
    marginButton: 20,
    width: 100,
    // marginTop: 20,
    '&:hover': {
      background: '#006699',
    },
  },
});
interface PROPS {
  onClick: () => void;
  label: string;
  disabled?: any;
}

const NormalButton: React.FC<PROPS> = (props) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      variant="contained"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
};

export default NormalButton;

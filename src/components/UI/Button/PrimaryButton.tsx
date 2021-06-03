import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#00CED1',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    height: 48,
    marginButton: 20,
    width: 220,
    margin: '20px 10px 0 10px',
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

const PrimaryButton: React.FC<PROPS> = (props) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      variant="contained"
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;

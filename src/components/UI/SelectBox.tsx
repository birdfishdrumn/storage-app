import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';
import { MinText } from 'style/GlobalStyle';

const useStyle = makeStyles({
  FormControl: {
    marginBottom: 16,
    minWidth: 128,
    width: '100%',
  },
  label: {
    padding: '0 10px',
    zIndex: 1,
  },
  form: {
    background: 'white',
    // zIndex:-4
  },
});

interface PROPS {
  options: {
    id: string;
    name: string;
  }[];
  select: any;
  label: string;
  value: string;
  required: boolean;
  move?: boolean;
}

const SelectBox: React.FC<PROPS> = (props) => {
  const classes = useStyle();
  console.log(props.options);
  return (
    <FormControl className={classes.FormControl}>
      <InputLabel className={classes.label}>{props.label}</InputLabel>
      <Select
        className={classes.form}
        variant="outlined"
        required={props.required}
        value={props.value}
        onChange={(event) => props.select(event.target.value)}
      >
        {/* 全体にmapを適用するわけではないので、すぐに{}で囲わないように注意する。 */}
        {props.options.map((option) => (
          <MenuItem key={option.id} value={props.move ? option.id : option.name}>
            <MinText>{option.name}</MinText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;

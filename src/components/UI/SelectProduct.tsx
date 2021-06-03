import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';
import { StyledImage, GridList } from 'style/GlobalStyle';

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
    id?: string;
    name: string;
    images: { [key: string]: string }[];
  }[];
  select: any;
  label: string;
  value: string;
  required: boolean;
}

const SelectBox: React.FC<PROPS> = (props) => {
  const classes = useStyle();
  return (
    <FormControl className={classes.FormControl}>
      <InputLabel className={classes.label}>{props.label}</InputLabel>
      <Select
        fullWidth={false}
        className={classes.form}
        variant="outlined"
        required={props.required}
        value={props.value}
        onChange={(e) => props.select(e.target.value)}
      >
        {/* 全体にmapを適用するわけではないので、すぐに{}で囲わないように注意する。 */}

        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.name}>
            <div>
              <img style={{ width: '50px', marginRight: '10px' }} src={option.images[0].path} />
              {option.name}
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;

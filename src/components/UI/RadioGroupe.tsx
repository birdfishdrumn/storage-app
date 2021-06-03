import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio, { RadioProps } from '@material-ui/core/Radio';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

interface PROPS {
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data: string[];
}

const RadioButtons: React.FC<PROPS> = ({ selectedValue, setSelectedValue, handleChange, data }) => {
  return (
    <div>
      {data.map((item) => (
        <>
          <Radio
            key={item}
            checked={selectedValue === item}
            onChange={handleChange}
            value={item}
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'A' }}
          />
          {item}
        </>
      ))}
    </div>
  );
};

export default RadioButtons;

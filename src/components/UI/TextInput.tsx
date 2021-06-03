import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const StyledInput = styled(TextField)`
  margin: 15px 0;
`;
interface PROPS {
  fullWidth: boolean;
  label: string;
  margin?: string;
  name?: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string | number;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant: 'standard' | 'filled' | 'outlined' | undefined;
  inputProps?: any;
  error?: boolean;
  helperText?: string | boolean;
}

const TextInput: React.FC<PROPS> = (props) => {
  return (
    <StyledInput
      style={{ background: 'white' }}
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      name={props.name}
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      variant={props.variant}
      inputProps={props.inputProps}
      error={props.error}
      helperText={props.helperText}
    />
  );
};

export default TextInput;

import React from 'react';

import {Control, FieldValues, Path, useController} from 'react-hook-form';

import Input, {InputProps} from '../Input';


type Props<T extends FieldValues> = InputProps & {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
};

const ControlledInput = <T extends FieldValues,>(props: Props<T>): JSX.Element => {
  const {control, name, ...inputProps} = props;
  const {field: {value, onChange, onBlur, ref}, fieldState: {error}} = useController({control, name});
  return (
    <Input
      {...inputProps}
      onBlur={onBlur}
      ref={ref}
      onChange={onChange}
      value={value}
      error={error?.message}
    />
  );
};

export default ControlledInput;

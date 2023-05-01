import React, {ChangeEventHandler, forwardRef} from 'react';


import type {Noop} from 'react-hook-form';

import Text from '../Text';

import colors from '@webshop/constants/colors';

import styles from './Input.module.css';


export type Props = {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: Noop;
  placeholder?: string;
  type?: HTMLInputElement['type'];
  label?: string;
  required?: boolean;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const {value, onChange, onBlur, placeholder, type = 'text', label, required, error} = props;
    return (
      <div className={styles.container}>
        <Text variant="small">{label}{required && '*'}</Text>
        <div className={styles['input-container']}>
          <input
            ref={ref}
            className={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
            required={required}
            onBlur={onBlur}
          />
        </div>
        <Text variant='small' color={colors.error}>
          {error}
        </Text>
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;

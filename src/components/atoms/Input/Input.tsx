/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line no-use-before-define
import React, { ForwardedRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  text-align: ${({ className }) => (
    className?.includes('card-register__input--card-owner')
      ? '' : 'center'
  )};
  width: ${({ className }) => {
    if (className?.includes('card-register__input--card-number')) {
      return '4em';
    } if (className?.includes('card-register__input--card-password')) {
      return '1em';
    } if (className?.includes('card-register__input--card-cvc')) {
      return '3em';
    } if (className?.includes('card-register__input--card-expiration')) {
      return '5em';
    } if (className?.includes('card-register__input--card-owner')) {
      return '100%';
    }
    return '';
  }};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

type InputProps = {
  className?: string,
  type?: string,
  name: string,
  value?: string,
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  required?: boolean,
};

const Input = React.forwardRef(({
  className, type, name, value, onChange, placeholder, required, ...rest
}: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <StyledInput
      className={className}
      ref={ref}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      {...rest}
    />
  );
});

Input.defaultProps = {
  className: '',
  type: 'text',
  value: '',
  placeholder: '',
  required: false,
};

export default Input;
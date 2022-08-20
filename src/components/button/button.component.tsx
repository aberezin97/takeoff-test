import React from 'react';
import {
  Button as BootstrapButton,
  ButtonProps,
  Spinner,
} from 'react-bootstrap';

export interface IButtonProps extends ButtonProps {
  isLoading: boolean;
}

const Button = ({ children, isLoading, ...otherProps }: IButtonProps) => {
  return (
    <BootstrapButton {...otherProps}>
      {isLoading ? <Spinner animation="border" size="sm" /> : children}
    </BootstrapButton>
  );
};

export default Button;

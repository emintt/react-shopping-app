// default
// inverted
// google sign in

import { ButtonHTMLAttributes, FC } from "react";
import './button-styles.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted'
};

type ButtonProps = {children: any} & {buttonType: 'google' | 'inverted'} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button : FC<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;

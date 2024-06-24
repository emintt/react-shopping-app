import { ButtonHTMLAttributes, FC } from "react";
import { BaseButton, GoogleSignInButton, InvertedButton } from "./button-styles";
import { BUTTON_TYPE_CLASSES } from "./button-class";


  // const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  //   const buttonObject = {
  //     [BUTTON_TYPE_CLASSES.base]: BaseButton,
  //     [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
  //     [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  //   };
  //   return buttonObject[buttonType];
  // };

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

type ButtonProps = {children: React.ReactNode} & {buttonType: string} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button : FC<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton {...otherProps}>
      {children}
    </CustomButton>
  );
};

export default Button;

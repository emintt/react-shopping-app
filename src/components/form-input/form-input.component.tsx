import { FC, InputHTMLAttributes } from "react";
import { FormInputLabel, Group, Input } from "./form-input.styles";

type FormInputProps = {label: string } &  InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  // spread out all atributes to otherProps (onChange, type, required, name, value)
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel $shrink={otherProps.value ? 1 : 0}>{label}</FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;

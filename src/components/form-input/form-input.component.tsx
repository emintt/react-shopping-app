import { FC, InputHTMLAttributes } from "react";
import './form-input.styles.scss';

type FormInputProps = {label: string } &  InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  // spread out all atributes to otherProps (onChange, type, required, name, value)
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label className={`${otherProps.value?.length ? 'shrink' : ''} form-input-label `}>{label}</label>
      )}
    </div>
  );
};

export default FormInput;

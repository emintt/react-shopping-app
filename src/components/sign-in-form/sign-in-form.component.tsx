import { useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {  signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { BUTTON_TYPE_CLASSES } from "../button/button-class";
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";
import { FirebaseError } from "firebase/app";


const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
  };


  const handleSubmit = async (event: React.SyntheticEvent) => {
    console.log('handle submit', formFields);
    event.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
    } catch (error) {
      if ((error as unknown as FirebaseError).code ===  'auth/invalid-credential') {
        alert('invalid email or password');
      } else {
        console.log('user login encountered an error', error);
      }
    }
  };

  const handleChange = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    console.log('handle change');
    setFormFields({...formFields, [name]: value});
  };



  return (
    <SignInContainer>
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit} >
        <FormInput
          onChange={handleChange}
          label="Email"
          type="email"
          required
          autoComplete="email"
          name="email"
          value={email} />
        <FormInput
          onChange={handleChange}
          label="Password"
          type="password"
          required
          autoComplete="password"
          name="password"
          value={password} />
        <ButtonsContainer>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type="submit">Sign In</Button>
          <Button onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google} type="button">Google Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>

  );
};

export default SignInForm;

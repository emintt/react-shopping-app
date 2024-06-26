import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer } from "./sign-up-form-styles";
import { FirebaseError } from "firebase/app";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;


  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    // confirm that passwords matches
    if (password !== confirmPassword) {
      console.log('passwords do not match');
      return;
    }

    try {
      // is authenticated with email and user?
      const response  = await createAuthUserWithEmailAndPassword(email, password);
      console.log(response);

      if (response) {
        // create a user document from what this return
        await createUserDocumentFromAuth(response.user, { displayName });
        resetFormFields();
      } else {
        throw new Error();
      }

    } catch (error) {
      if ((error as unknown as FirebaseError).code === 'auth/email-already-in-use') {
        alert('can not create user, email already in used');
      } else {
        console.log('user creation encountered an error', error);
      }
    }


  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  };



  return (
    <SignUpContainer>
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit} >
        <FormInput
          onChange={handleChange}
          label="Display Name"
          type="text"
          required
          name="displayName"
          value={displayName} />

        <FormInput
          onChange={handleChange}
          label="Email"
          type="email"
          required
          name="email"
          value={email} />

        <FormInput
          onChange={handleChange}
          label="Password"
          type="password"
          required
          autoComplete="new-password"
          name="password"
          value={password} />

        <FormInput
          onChange={handleChange}
          label="Confirm Password"
          type="password"
          required
          autoComplete="new-password"
          name="confirmPassword"
          value={confirmPassword} />

        <Button buttonType="inverted" type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
}

export default SignUpForm;

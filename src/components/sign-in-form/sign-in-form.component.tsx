import { useContext, useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';
import { UserContext } from "../../contexts/user.context";


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
      if (error.code ===  'auth/invalid-credential') {
        alert('invalid email or password');
      } else {
        console.log('user login encountered an error', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log('handle change');
    setFormFields({...formFields, [name]: value});
  };



  return (
    <div className="sign-up-container">
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
        <div className="buttons-container">
          <Button buttonType="inverted" type="submit">Sign In</Button>
          <Button onClick={signInWithGoogle} buttonType="google" type="button">Google Sign In</Button>
        </div>


      </form>
    </div>

  );
};

export default SignInForm;

import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

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
      if (error.code === 'auth/email-already-in-use') {
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
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit} >
        <label htmlFor="">Display Name</label>
        <input onChange={handleChange} type="text" required name="displayName" value={displayName} />

        <label htmlFor="">Email</label>
        <input onChange={handleChange} type="email" required name="email" value={email} />

        <label htmlFor="">Password</label>
        <input onChange={handleChange} type="password" required name="password" value={password} />

        <label htmlFor="">Confirm Password</label>
        <input onChange={handleChange} type="password" required name="confirmPassword" value={confirmPassword} />

        <button type="submit" >Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;

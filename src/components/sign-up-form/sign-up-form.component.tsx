import { useState } from "react";

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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={() => {}} >
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

import {  createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);

    createUserDocumentFromAuth(user);
  };

  // // With redirect, after signInWithGoogleRedirect get called, the app unmounted
  // useEffect(() => {
  //   // get res of the redirect that just happened ( bases on auth, because auth is some kind of instance tracking authentication)
  //   const getRedirectSigninResult = async () => {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);
  //     if (response) {
  //       createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   getRedirectSigninResult();
  // }, []);


  return (
    <div>
      <h2>Sign in page</h2>
      <button onClick={logGoogleUser}>Sign In With Google Pop up</button>
      {/* <button onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button> */}

      <SignUpForm />

    </div>
  );
};

export default SignIn;

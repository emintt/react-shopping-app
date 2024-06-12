import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss';

const Authentication = () => {

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
  };

  export default Authentication;


 // {/* <button onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button> */}
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

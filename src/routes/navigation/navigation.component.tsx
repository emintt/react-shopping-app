import { Link, Outlet } from "react-router-dom";
import MainLogo from '../../assets/crown.svg';
import './navigation.styles.scss';
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signUserOut } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signUserOut();
  };

  return (
    <>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <img className="logo" src={MainLogo} />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ?
            <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span>
          :
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          }

        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;

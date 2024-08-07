import { Link, Outlet } from "react-router-dom";
import MainLogo from '../../assets/crown.svg';
import './navigation.styles';
import { signUserOut } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { LogoContainer, NavLink, NavLinksContainer, NavigationContainer } from "./navigation.styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const signOutHandler = async () => {
    await signUserOut();
  };

  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <img className="logo" src={MainLogo} />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ?
            <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
          :
            <NavLink to="/auth" >
              SIGN IN
            </NavLink>
          }
          <CartIcon />

        </NavLinksContainer>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;

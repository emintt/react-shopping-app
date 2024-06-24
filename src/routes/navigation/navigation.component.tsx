import { Link, Outlet } from "react-router-dom";
import MainLogo from '../../assets/crown.svg';
import './navigation.styles';
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signUserOut } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { LogoContainer, NavLink, NavLinksContainer, NavigationContainer } from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signUserOut();
  };

  const { isCartOpen } = useContext(CartContext);


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

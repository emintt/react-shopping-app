import ShoppingIcon from '../../assets/shopping-bag.svg';
import { CartIconContainer, ItemCount, ShoppingIconStyles } from './cart-icon.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const CartIcon = () => {

  const cartContext = useContext(CartContext);
  const { setIsCartOpen, isCartOpen, cartCount } = cartContext;

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIconStyles src={ShoppingIcon} alt="shopping-icon"/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

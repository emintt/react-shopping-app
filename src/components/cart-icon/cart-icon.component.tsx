import { useContext } from 'react';
import ShoppingIcon from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
import { CartIconContainer, ItemCount, ShoppingIconStyles } from './cart-icon.styles';


const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

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

import ShoppingIcon from '../../assets/shopping-bag.svg';
import { CartIconContainer, ItemCount, ShoppingIconStyles } from './cart-icon.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const CartIcon = () => {

  const cartContext = useContext(CartContext);
  const { setIsCartOpen, isCartOpen } = cartContext;

  const cartCount = useSelector(selectCartCount);

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

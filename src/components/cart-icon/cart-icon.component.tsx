import ShoppingIcon from '../../assets/shopping-bag.svg';
import { CartIconContainer, ItemCount, ShoppingIconStyles } from './cart-icon.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';


const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  }
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIconStyles src={ShoppingIcon} alt="shopping-icon"/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

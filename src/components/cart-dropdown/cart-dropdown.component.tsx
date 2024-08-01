import { useContext } from 'react';
import Button from '../button/button.component';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { CartProduct } from '../../types/DBTypes';
import { useNavigate } from 'react-router-dom';
import { BUTTON_TYPE_CLASSES } from '../button/button-class';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropDown = () => {
  // const cartContext  = useContext(CartContext);
  // const cartItems = cartContext.cartItems as CartProduct[];

  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const goToCheckoutHandle = () => {
    navigate('/checkout');
  }
  return (
    <CartDropdownContainer>
        <CartItems>
          {cartItems.length ? (
            cartItems.map((item) => (<CartItem key={item.id} cartItem={item}/>))
          ) : (
            <EmptyMessage>Your cart is empty</EmptyMessage>
          )}
        </CartItems>
       <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={goToCheckoutHandle} > Go to Checkout</Button>
    </CartDropdownContainer>
  );
};

export default CartDropDown;

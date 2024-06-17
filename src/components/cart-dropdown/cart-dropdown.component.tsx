import { useContext } from 'react';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { CartProduct } from '../../types/DBTypes';
import { useNavigate } from 'react-router-dom';

const CartDropDown = () => {
  const cartContext  = useContext(CartContext);
  const cartItems = cartContext.cartItems as CartProduct[];

  const navigate = useNavigate();

  const goToCheckoutHandle = () => {
    navigate('/checkout');
  }
  return (
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
          {cartItems && cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item}/>
          ))}
        </div>
       <Button buttonType='inverted' onClick={goToCheckoutHandle} > Go to Checkout</Button>
    </div>
  );
};

export default CartDropDown;

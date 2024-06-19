import { useContext } from 'react';
import './checkout.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import { CartProduct } from '../../types/DBTypes';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartItems as CartProduct[];
  const cartTotal = cartContext.cartTotal;
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      { cartItems && cartItems.map((item) => {
        return (
          <CheckoutItem key={item.id} cartItem={item}/>
        );
      })
      }
      <span className='total'>Total: {cartTotal ? cartTotal : 0} €</span>
    </div>
  );
};

export default Checkout;

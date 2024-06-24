import { useContext } from 'react';
import './checkout.styles';
import { CartContext } from '../../contexts/cart.context';
import { CartProduct } from '../../types/DBTypes';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const Checkout = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartItems as CartProduct[];
  const cartTotal = cartContext.cartTotal;
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      { cartItems && cartItems.map((item) => {
        return (
          <CheckoutItem key={item.id} cartItem={item}/>
        );
      })
      }
      <Total>Total: {cartTotal ? cartTotal : 0} €</Total>
    </CheckoutContainer>
  );
};

export default Checkout;

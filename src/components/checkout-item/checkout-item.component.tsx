import { useContext } from 'react';
import { CartProduct } from '../../types/DBTypes';
import { CartContext } from '../../contexts/cart.context';
import { CheckoutItemContainer, ImageContainer, Quantity, RemoveButton } from './checkout-item.styles';

const CheckoutItem = ({ cartItem } : { cartItem: CartProduct}) => {
  const { name, imageUrl, quantity, price } = cartItem;

  const { clearItemFromCart, removeCartItemFromCart, addItemToCart } = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);
  const removeItemHandler = () => removeCartItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <span className='name'>{name}</span>
      <Quantity>
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        {quantity}
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </Quantity>
      <span className='price'>{price}</span>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;

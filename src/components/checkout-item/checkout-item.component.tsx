import { CartProduct } from '../../types/DBTypes';
import { CheckoutItemContainer, ImageContainer, Quantity, RemoveButton } from './checkout-item.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, clearItemFromCart, removeCartItemFromCart } from '../../store/cart/cart.action';

const CheckoutItem = ({ cartItem } : { cartItem: CartProduct}) => {
  const { name, imageUrl, quantity, price } = cartItem;

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems,cartItem));
  const removeItemHandler = () => dispatch(removeCartItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

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

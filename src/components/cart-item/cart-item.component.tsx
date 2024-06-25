import { CartProduct } from '../../types/DBTypes';
import { CartItemContainer, ItemDetails } from './cart-item.styles';

const CartItem = ({ cartItem }: { cartItem: CartProduct}) => {
  const { name, quantity, price, imageUrl } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <span className="name">{name}</span>
        <span className="quantity">{quantity}  x {price} €</span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;

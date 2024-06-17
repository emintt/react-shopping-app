import { CartProduct } from '../../types/DBTypes';
import './cart-item.styles.scss';

const CartItem = ({ cartItem }: { cartItem: CartProduct}) => {
  const { name, quantity } = cartItem;
  return (
    <div>
      <h2>{name}</h2>
      <p>{quantity}</p>
    </div>
  );
};

export default CartItem;

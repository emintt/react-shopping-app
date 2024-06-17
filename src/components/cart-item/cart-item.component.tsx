import { CartProduct } from '../../types/DBTypes';
import './cart-item.styles.scss';

const CartItem = ({ cartItem }: { cartItem: CartProduct}) => {
  const { name, quantity, imageUrl } = cartItem;
  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="quantity">{quantity}</span>
      </div>
    </div>
  );
};

export default CartItem;

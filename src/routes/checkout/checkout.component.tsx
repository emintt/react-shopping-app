import { useContext } from 'react';
import './checkout.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import { CartProduct, Product } from '../../types/DBTypes';

const Checkout = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartItems as CartProduct[];
  const { addItemToCart, removeCartItemFromCart } = cartContext;

  return (
    <div>
      <h2>Check out page</h2>
      { cartItems && cartItems.map((item) => {
        const { id, imageUrl, name, quantity } = item;
        return (
          <div key={id}>
            <h2>{name}</h2>
            <img src={imageUrl} alt={name} />
            <p><button className='less-than-icon' onClick={() => {removeCartItemFromCart(item)}}>&lt; &nbsp;</button>{quantity}<button className='greater-than-icon' onClick={() => {addItemToCart(item)}}>&nbsp; &gt;</button></p>
            <p>{item.price}</p>
            <button>X</button>
          </div>
        );
      })
      }
    </div>
  );
};

export default Checkout;

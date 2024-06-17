import { useContext } from 'react';
import { Product, CartProduct } from '../../types/DBTypes';
import Button from '../button/button.component';
import './product-card.styles.scss';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product}: {product: Product} ) => {
  const { name, price, imageUrl } = product;

  const cartContext  = useContext(CartContext);
  const addItemToCart = cartContext.addItemToCart;

  const addProductToCart = () => {
    addItemToCart(product);
  };

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={name} />
      <div className='footer'>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart} >Add to card</Button>
    </div>
  );
};

export default ProductCard;

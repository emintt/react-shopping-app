import { useContext } from 'react';
import { Product, CartProduct } from '../../types/DBTypes';
import Button from '../button/button.component';
import { CartContext } from '../../contexts/cart.context';
import { Footer, Image, ProductCardButton, ProductCardContainer } from './product-card.styles';

const ProductCard = ({product}: {product: Product} ) => {
  const { name, price, imageUrl } = product;

  const cartContext  = useContext(CartContext);
  const addItemToCart = cartContext.addItemToCart;

  const addProductToCart = () => {
    addItemToCart(product);
  };

  return (
    <ProductCardContainer>
      <Image src={imageUrl} alt={name} />
      <Footer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </Footer>
      <ProductCardButton buttonType="inverted" onClick={addProductToCart} >Add to card</ProductCardButton>
    </ProductCardContainer>
  );
};

export default ProductCard;

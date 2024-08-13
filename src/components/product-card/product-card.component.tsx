import { Product } from '../../types/DBTypes';
import { Footer, Image, ProductCardButton, ProductCardContainer } from './product-card.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product}: {product: Product} ) => {
  const { name, price, imageUrl } = product;

  const cartContext = useContext(CartContext);
  const {addItemToCart} = cartContext;

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

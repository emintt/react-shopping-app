import { Product } from '../../types/DBTypes';
import { Footer, Image, ProductCardButton, ProductCardContainer } from './product-card.styles';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useDispatch, useSelector } from 'react-redux';

const ProductCard = ({product}: {product: Product} ) => {
  const { name, price, imageUrl } = product;

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, product));
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

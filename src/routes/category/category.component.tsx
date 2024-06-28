import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../../types/DBTypes';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.styles';
import { useCategoriesContext } from '../../hooks/contextHooks';

const Category = () => {
  // access path value
  const { category } = useParams();

  const { categoriesMap } = useCategoriesContext();

  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    if (category) {
      setProducts(categoriesMap[category]);
    }
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle>{category}</CategoryTitle>
      <CategoryContainer>
        {
          products
            && products.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </CategoryContainer>
    </>
  );
};

export default Category;

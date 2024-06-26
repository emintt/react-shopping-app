import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import { Product } from '../../types/DBTypes';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.styles';

const Category = () => {
  // access path value
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    setProducts(categoriesMap[category]);
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

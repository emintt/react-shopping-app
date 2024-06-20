import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss';
import CategoryPreview from "../../components/category-preview/category-preview.component";

const Shop = () => {
  const categoriesContext  = useContext(CategoriesContext);
  const categoriesMap = categoriesContext?.categoriesMap;
  console.log(categoriesMap);
  return (
    <div className="shop-container">
      {
        categoriesMap && (Object.keys(categoriesMap).map((title) =>{
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products}/>
        }))
      }
    </div>


  );
};

export default Shop;

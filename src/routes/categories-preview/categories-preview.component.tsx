import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import './categories-preview.styles.scss';
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const categoriesContext  = useContext(CategoriesContext);
  const categoriesMap = categoriesContext?.categoriesMap;
  console.log(categoriesMap);
  return (
    <>
      {
        categoriesMap && (Object.keys(categoriesMap).map((title) =>{
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products}/>
        }))
      }
    </>


  );
};

export default CategoriesPreview;

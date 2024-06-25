import { Product } from "../../types/DBTypes";
import ProductCard from "../product-card/product-card.component";
import { CategoryPreviewContainer, Preview, Title } from "./category-preview.styles";

const CategoryPreview = ({ title, products } : { title: string, products: Product[]}) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title} >{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {
          products
            .filter((_, index: number) => index < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;

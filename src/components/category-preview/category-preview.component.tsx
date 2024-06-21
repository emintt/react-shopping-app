import { Link } from "react-router-dom";
import { Product } from "../../types/DBTypes";
import ProductCard from "../product-card/product-card.component";
import './category-preview.tyles.scss';

const CategoryPreview = ({ title, products } : { title: string, products: Product[]}) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title} className="title">{title.toUpperCase()}</Link>
      </h2>
      <div className="preview">
        {
          products
            .filter((_, index: number) => index < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </div>
  );
};

export default CategoryPreview;

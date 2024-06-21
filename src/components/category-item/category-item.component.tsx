import { Category } from "../../types/DBTypes";
import './category-item.styles.scss';

const CategoryItem = ({ category }: { category: Category }) => {
  const { title, imageUrl } = category;
  return (
    <>
      <div className="category-item-container">
        <div
          className="background-image"
          style={
            {backgroundImage: `url(${imageUrl})`
          }}
        />
        <div className="category-item-body-container">
          <h2>{title}</h2>
          <p>Shop now</p>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;

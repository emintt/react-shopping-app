import { Category } from "../../types/DBTypes";
import CategoryItem from "../category-item/category-item.component";
import './category-menu.styles.scss';

const CategoryMenu = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="category-menu">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category}/>
        ))}
    </div>
  );
};

export default CategoryMenu;

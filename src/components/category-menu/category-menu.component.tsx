import { Category } from "../../types/DBTypes";
import CategoryItem from "../category-item/category-item.component";
import { Menu } from "./category-menu.styles";

const CategoryMenu = ({ categories }: { categories: Category[] }) => {
  return (
    <Menu>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category}/>
        ))}
    </Menu>
  );
};

export default CategoryMenu;

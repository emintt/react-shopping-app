import { Category } from "../../types/DBTypes";
import { BackgroundImage, CategoryItemBodyContainer, CategoryItemContainer } from "./category-item.styles";

const CategoryItem = ({ category }: { category: Category }) => {
  const { title, imageUrl } = category;
  return (
    <>
      <CategoryItemContainer>
        <BackgroundImage
          $imageUrl={imageUrl}
        />
        <CategoryItemBodyContainer>
          <h2>{title}</h2>
          <p>Shop now</p>
        </CategoryItemBodyContainer>
      </CategoryItemContainer>
    </>
  );
};

export default CategoryItem;

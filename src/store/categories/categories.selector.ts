import { CategoryMap } from "../../types/DBTypes";
import { RootState } from "../store";

export const selectCategoriesMap = (state: RootState) => {
  console.log('selector fired');
  const categoriesMap = state.categories.categories?.reduce(
  (acc: CategoryMap, category): CategoryMap => {
    const { title, items } = category;
    acc[title.toLowerCase() as keyof CategoryMap] = items;
    return acc;
  },
  {}
  );
  return categoriesMap;
};

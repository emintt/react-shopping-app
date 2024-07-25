import { RootState } from "../store";

export const selectCategoriesMap = (state: RootState) => state.categories.categoriesMap;

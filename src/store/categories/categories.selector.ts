import { createSelector } from "reselect";
import { CategoryMap } from "../../types/DBTypes";
import { RootState } from "../store";

const selectCategoriesReducer = (state: RootState) => state.categories;

// select categories array of state
export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories?.reduce(
    (acc: CategoryMap, category): CategoryMap => {
      const { title, items } = category;
      acc[title.toLowerCase() as keyof CategoryMap] = items;
      return acc;
    },
    {}
    )
);

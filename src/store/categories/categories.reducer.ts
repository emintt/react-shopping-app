import { ProductCategories } from "../../types/DBTypes";
import { CATEGORIES_ACTION_TYPE } from "./categories.types";

type CategoriesAction = {
  type: string,
  payload?: ProductCategories[]
};

type CategoriesState = {
  categories: ProductCategories[]
};

const categoriesInitialState = {
  categories: [],
};

const categoriesReducer = (
  state: CategoriesState = categoriesInitialState,
  action: CategoriesAction | Record<string, never> = {},
) : CategoriesState => {
  const { type, payload } = action
  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES:
      if (!payload) return state;
      return {...state, categories: payload};
    default:
      return state;
  }
};

export { categoriesReducer };

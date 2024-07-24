import { CategoryMap } from "../../types/DBTypes";
import { CATEGORIES_ACTION_TYPE } from "./categories.types";

type CategoriesAction = {
  type: string,
  payload?: CategoryMap
};

type CategoriesState = {
  categoriesMap: CategoryMap
};

const categoriesInitialState = {
  categoriesMap: {},
};

const categoriesreducer = (
  state: CategoriesState = categoriesInitialState,
  action: CategoriesAction | Record<string, never> = {},
) => {
  const { type, payload } = action
  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES_MAP:
      return {...state, categoriesMap: payload};
    default:
      return state;
  }
};

export { categoriesreducer };

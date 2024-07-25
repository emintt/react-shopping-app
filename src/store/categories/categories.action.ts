import { CategoryMap } from "../../types/DBTypes";
import { CATEGORIES_ACTION_TYPE } from "./categories.types";

const setCategoriesMap = (categoriesMap: CategoryMap) => {
  return ({
    type: CATEGORIES_ACTION_TYPE.SET_CATEGORIES_MAP,
    payload: categoriesMap
  });
};

export { setCategoriesMap };

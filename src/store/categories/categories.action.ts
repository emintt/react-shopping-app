import { DocumentData } from "firebase/firestore";
import { CATEGORIES_ACTION_TYPE } from "./categories.types";

const setCategories = (categoriesArray: DocumentData[]) => {
  return ({
    type: CATEGORIES_ACTION_TYPE.SET_CATEGORIES,
    payload: categoriesArray
  });
};

export { setCategories };

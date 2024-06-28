import { useContext } from "react";
import { CategoriesContext } from "../contexts/categories.context";

const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);

  if(!context) {
    throw new Error("useCategoriesContext must be used within a provider");
  }

  return context;
};

export { useCategoriesContext };

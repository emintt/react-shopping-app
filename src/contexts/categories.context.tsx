import { ReactNode, createContext, useEffect, useState } from "react";
import { CategoryMap } from "../types/DBTypes";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

type ProductsContextType = {
  categoriesMap: CategoryMap;
};

// as the actual value we want to access
export const CategoriesContext = createContext<ProductsContextType | null>({
  categoriesMap: {},
});


// actual component
export const CategoriesProvider = ({children} : {children: ReactNode}) => {
  const [categoriesMap, setCategoriesMap] = useState<CategoryMap | Record<string, never>>({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };


  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
};

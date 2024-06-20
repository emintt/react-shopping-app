import { ReactNode, createContext, useEffect, useState } from "react";
import SHOP_DATA from '../shop-data';
import { Product } from "../types/DBTypes";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

type ProductsContextType = {
  products: Product[];
};

// as the actual value we want to access
export const ProductsContext = createContext<ProductsContextType | null>({
  products: [],
});


// actual component
export const ProductsProvider = ({children} : {children: ReactNode}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const productData = await getCategoriesAndDocuments();
      console.log(productData);
    };
    getCategoriesMap();
  }, []);

  const value = { products };


  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
};

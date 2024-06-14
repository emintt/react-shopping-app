import { ReactNode, createContext, useState } from "react";
import PRODUCTS from '../shop-data.json';
import { Product } from "../types/DBTypes";

export type ProductContextType = {
  products: Product[];
};

// as the actual value we want to access
export const ProductsContext = createContext<ProductContextType | null>({
  products: [],
});


// actual component
export const ProductsProvider = ({children} : {children: ReactNode}) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const value = { products };


  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
};

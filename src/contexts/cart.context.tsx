import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: true,
  setIsCartOpen: () => {},
});

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const value = { isCartOpen, setIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

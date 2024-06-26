import { createContext, useEffect, useState } from "react";
import { CartProduct, Product } from "../types/DBTypes";


const addCartItem = (cartItems: CartProduct[], productToAdd: Product): CartProduct[] => {
  // find if cartItems contains productToAdd
  const existingItem = cartItems.find((item) => item.id === productToAdd.id);

  // if found, increase quantity
  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem
    );
  }
  // return new array with modified cartItems/ new cart item
  return [...cartItems, {...productToAdd, quantity: 1}];
};


const removeCartItem = (cartItems: CartProduct[], productToRemove: Product): CartProduct[] => {
  // find the cart item to remove
  const existingCartItem = cartItems.find((item) => item.id === productToRemove.id);

  // if the item's quantity is euqal to 1, if it is, remove the product
  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== existingCartItem.id);
  }
  // return new array with modified cartItems/ new cart item
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
  );
};

const clearCartItem = (cartItems: CartProduct[], cartItemToClear: CartProduct) => {
  return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: (isCartOpen : boolean) => {},
  cartItems: [],
  addItemToCart: (product : Product) => {},
  cartCount: 0,
  removeCartItemFromCart: (cartItem : CartProduct) => {},
  clearItemFromCart: (cartItem : CartProduct) => {},
  cartTotal: 0,
});

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartProduct[] | []>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const totalCartItem = cartItems.reduce((total, currentCartItem) =>
      total + currentCartItem.quantity, 0);
    setCartCount(totalCartItem);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price
    , 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd: Product) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeCartItemFromCart = (productToRemove: CartProduct) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear: CartProduct) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };




  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    setCartCount,
    removeCartItemFromCart,
    clearItemFromCart,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

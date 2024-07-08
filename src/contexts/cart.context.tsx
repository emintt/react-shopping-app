import { createContext, useEffect, useReducer, useState } from "react";
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

const initialState: CartState = {
  isCartOpen: true,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

type CartState = {
  isCartOpen: boolean,
  cartItems: CartProduct[],
  cartCount: number,
  cartTotal: number,
}

type CartAction = {
  type: string;
  payload?: {
    cartItems: CartProduct[],
    cartCount: number,
    cartTotal: number,
  };
};

const CART_ACTION_TYPES = {
  TOGGLE_CART_OPEN: "TOGGLE_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
}

const cartReducer = (state: typeof initialState, action: CartAction): CartState => {
  const { type, payload } = action;

  // const payload = {cartItems, cartCount, cartTotal};
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }

};

export const CartProvider = ({children}: {children: React.ReactNode}) => {

  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { cartItems, cartCount, cartTotal, isCartOpen } = state;

  const updateCartItemsReducer = (newCartItems: CartProduct[]) => {
    // generate new cart count
    const newCartCount = newCartItems.reduce(
      (total, currentCartItem) => total + currentCartItem.quantity,
      0
    );

    // generate new cart total
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    // dispatch new action with payload
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      }
    });

  };

  const addItemToCart = (productToAdd: Product) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeCartItemFromCart = (productToRemove: CartProduct) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear: CartProduct) => {
    const newCartItems =clearCartItem(cartItems, productToClear);
    updateCartItemsReducer(newCartItems);
  };




  const value = {
    isCartOpen,
    setIsCartOpen: ()=> {},
    addItemToCart,
    cartItems,
    cartCount,
    removeCartItemFromCart,
    clearItemFromCart,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};

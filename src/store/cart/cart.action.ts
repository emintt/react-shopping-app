import { CartProduct, Product } from "../../types/DBTypes";
import { CART_ACTION_TYPES } from "./cart.types";

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


const setIsCartOpen = (bool: boolean) => {
  return ({
    type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
    payload: bool
  });
};

const addItemToCart = (cartItems: CartProduct[], productToAdd: Product) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  // return action object
  return ({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems });
};

const removeCartItemFromCart = (cartItems: CartProduct[], productToRemove: CartProduct) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return ({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems });
};

const clearItemFromCart = (cartItems: CartProduct[], productToClear: CartProduct) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return ({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems });
};

export { setIsCartOpen, addItemToCart, removeCartItemFromCart, clearItemFromCart };

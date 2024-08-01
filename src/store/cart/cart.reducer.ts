import { CartProduct } from "../../types/DBTypes";
import { CART_ACTION_TYPES } from "./cart.types";

export const initialState: CartState = {
  isCartOpen: false,
  cartItems: [],
  // cartCount: 0,
  // cartTotal: 0,
};

type CartState = {
  isCartOpen: boolean,
  cartItems: CartProduct[],
  // cartCount: number,
  // cartTotal: number,
}

type CartAction =
| {
  type: string;
  payload?: CartProduct[], // cartItems
}
| {
  type: string;
  payload?: boolean
};


const cartReducer = (
  state: CartState = initialState,
  action: CartAction | Record<string, never> = {})
  : CartState => {
  const { type, payload } = action;

  // const payload = {cartItems, cartCount, cartTotal};
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      if (!payload || typeof(payload) === 'boolean') return state;
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      if (typeof(payload) === 'object' || typeof(payload) === 'undefined') return state;
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      return state;
  }

};

export { cartReducer };

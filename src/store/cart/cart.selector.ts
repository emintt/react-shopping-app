import { createSelector } from "reselect";
import { RootState } from "../store";

const selectCartReducer = (state: RootState) => {
  const cart = state.cart;
  return cart;
};

const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
      (total, currentCartItem) => total + currentCartItem.quantity, 0
    )
);

const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
    )
);


export { selectCartItems, selectCartCount, selectCartTotal};

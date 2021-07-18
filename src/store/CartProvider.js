import React, { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.value.price * action.value.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.value.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    if (existingCartItem) {
      let updatedItem;
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.value.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.value);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE_ITEM") {
    let updatedItems;
    const indexOfItemToBeRemoved = state.items.findIndex(
      (item) => item.id === action.value
    );
    const itemToModify = state.items[indexOfItemToBeRemoved];
    const updatedTotalAmount = state.totalAmount - itemToModify.price;

    if (itemToModify.amount > 1) {
      let updatedItem;
      updatedItem = { ...itemToModify, amount: itemToModify.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[indexOfItemToBeRemoved] = updatedItem;
    } else {
      updatedItems = [...state.items];
      updatedItems.splice(indexOfItemToBeRemoved, 1);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", value: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", value: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

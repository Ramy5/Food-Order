import { useReducer } from "react";
import context from "./cart-context";

const defaultState = {
  items: [],
  totalAmount: 0,
};

const stateReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingitem = state.items[existingItemIndex];

    let updatedItems;

    if (existingitem) {
      const updateItem = {
        ...existingitem,
        amount: existingitem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updateItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingitem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingitem.price;

    let updatedItems;

    if (existingitem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateItem = { ...existingitem, amount: existingitem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updateItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultState;
};

const ContextProvider = (props) => {
  const [changeState, dispatchState] = useReducer(stateReducer, defaultState);

  const addToItemsHandler = (item) =>
    dispatchState({ type: "ADD", item: item });

  const removeFromItemsHandler = (id) =>
    dispatchState({ type: "REMOVE", id: id });

  const contextValue = {
    items: changeState.items,
    totalAmount: changeState.totalAmount,
    addItem: addToItemsHandler,
    removeItem: removeFromItemsHandler,
  };

  return (
    <context.Provider value={contextValue}>{props.children}</context.Provider>
  );
};

export default ContextProvider;

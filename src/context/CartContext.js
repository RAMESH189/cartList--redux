import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducer/cartReducer";

export const initialState = {
  total: 0,
  cartList: [],
};
const cartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    const updatedCartList = state.cartList.concat(product);
    addToTotal(updatedCartList);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedCartList,
      },
    });
  };

  const removeFromCart = (product) => {
    const updatedCartList = state.cartList.filter(
      (item) => item.id !== product.id
    );
    addToTotal(updatedCartList);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCartList,
      },
    });
  };
  const addToTotal = (products) => {
    let total = 0;
    products.forEach((product) => (total = total + product.price));
    dispatch({
      type: "UPDATE_TOTAL",
      payload: {
        total,
      },
    });
  };

  const value = {
    total: state.total,
    cartList: state.cartList,
    addToCart,
    removeFromCart,
  };
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export const useCart = () => {
  return useContext(cartContext);
};

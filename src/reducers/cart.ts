import { type Reducer } from "redux";
import type { CartAttributes } from "../interfaces/cart";
import { ADDCARTS, type CartTypes } from "../constant/cart";

export interface CartState {
  carts: CartAttributes[];
}

export type CartAction<T = any> = {
  type: CartTypes;
  payload: T;
};

const initialState: CartState = { carts: [] };

const reducer: Reducer<CartState, CartAction> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ADDCARTS:
      return {
        ...state,
        carts: [...state.carts, payload],
      };
    default:
      return state;
  }
};

export default reducer
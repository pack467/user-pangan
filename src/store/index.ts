import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  type Reducer,
} from "redux";
import { thunk } from "redux-thunk";
import productReducer, {
  type ProductState,
  type ProductAction,
} from "../reducers/product";
import type { ProductAttributesWithImages } from "../interfaces/product";
import cartReducer, { CartAction, type CartState } from "../reducers/cart";
import type { CartAttributes } from "../interfaces/cart";

export type RootReducer = {
  productReducer: ProductState;
  cartReducer:CartState
};

const reducer: Reducer<
  RootReducer,
  ProductAction<ProductAttributesWithImages> & CartAction<CartAttributes>,
  any
> = combineReducers({ productReducer ,cartReducer});

export default createStore(reducer, applyMiddleware(thunk));

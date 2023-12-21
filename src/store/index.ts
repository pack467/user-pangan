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

export type RootReducer = {
  productReducer: ProductState;
};

const reducer: Reducer<
  RootReducer,
  ProductAction<ProductAttributesWithImages>,
  any
> = combineReducers({ productReducer });

export default createStore(reducer, applyMiddleware(thunk));

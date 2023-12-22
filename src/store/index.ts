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
import userReducer, { type UserAction, type UserState } from "../reducers/user";

export type RootReducer = {
  productReducer: ProductState;
  cartReducer: CartState;
  userReducer: UserState;
};

const reducer: Reducer<
  RootReducer,
  ProductAction<ProductAttributesWithImages> &
    CartAction<CartAttributes> &
    UserAction<any>,
  any
> = combineReducers({ productReducer, cartReducer, userReducer });

export default createStore(reducer, applyMiddleware(thunk));

import { type Reducer } from "redux";
import {
  GETALLCAROUSEL,
  GETALLPRODUCTS,
  type ProductTypes,
} from "../constant/product";
import type {
  CarrouselWithProduct,
  ProductAttributesWithImages,
} from "../interfaces/product";

export interface ProductState {
  products: ProductAttributesWithImages[];
  carrousels: CarrouselWithProduct[];
}

export type ProductAction<T = any> = {
  type: ProductTypes;
  payload: T;
};

const initialState: ProductState = { products: [], carrousels: [] };

const reducer: Reducer<ProductState, ProductAction> = (
  state = initialState as ProductState,
  { type, payload }
) => {
  switch (type) {
    case GETALLPRODUCTS:
      return {
        ...state,
        products: payload || [],
      };
    case GETALLCAROUSEL:
      return {
        ...state,
        carrousels: payload,
      };
    default:
      return state;
  }
};

export default reducer;

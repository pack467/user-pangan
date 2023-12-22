import { type Reducer } from "redux";
import {
  CHECKOUTWITHVA,
  GETALLCAROUSEL,
  GETALLPRODUCTS,
  SUCCESSCHECKOUTWITHVA,
  type ProductTypes,
} from "../constant/product";
import type {
  CarrouselWithProduct,
  ProductAttributesWithImages,
} from "../interfaces/product";
import { ChargeResp } from "../interfaces";

export interface ProductState {
  products: ProductAttributesWithImages[];
  carrousels: CarrouselWithProduct[];
  payment: ChargeResp | null;
}

export type ProductAction<T = any> = {
  type: ProductTypes;
  payload: T;
};

const initialState: ProductState = {
  products: [],
  carrousels: [],
  payment: null,
};

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
    case CHECKOUTWITHVA:
      return {
        ...state,
        payment: payload,
      };
    case SUCCESSCHECKOUTWITHVA:
      return {
        ...state,
        payment: null,
      };
    default:
      return state;
  }
};

export default reducer;

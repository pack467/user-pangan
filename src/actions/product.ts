import type {
  CarrouselWithProduct,
  ProductAttributesWithImages,
} from "../interfaces/product";
import type { BaseQuery } from "../interfaces/request";
import request from "../lib/axios";
import type { ThunkAction } from "redux-thunk";
import { type ProductAction, type ProductState } from "../reducers/product";
import { GETALLCAROUSEL, GETALLPRODUCTS } from "../constant/product";

export const getAllProduct =
  ({
    page,
    limit,
  }: BaseQuery): ThunkAction<
    Promise<ProductAttributesWithImages[]>,
    ProductState,
    any,
    ProductAction
  > =>
  async (dispatch) => {
    const {
      data: { data },
      status,
    } = await request.Query<ProductAttributesWithImages[]>({
      url: "/product",
      params: {
        page,
        limit,
      },
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });

    dispatch<any>({
      type: GETALLPRODUCTS,
      payload: data,
    });

    return status !== 200 ? [] : data;
  };

export const getAllCarousel =
  (): ThunkAction<
    Promise<CarrouselWithProduct[]>,
    ProductState,
    any,
    ProductAction
  > =>
  async (dispatch) => {
    const {
      data: { data },
      status,
    } = await request.Query({
      url: "/carrousel/",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });

    const payload = status !== 200 ? [] : data;

    dispatch<any>({
      type: GETALLCAROUSEL,
      payload,
    });

    return payload;
  };

export const getProductById = async (
  id: string
): Promise<ProductAttributesWithImages> => {
  const {
    data: { data, message },
    status,
  } = await request.Query<ProductAttributesWithImages>({
    url: `/product/${id}`,
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });

  if (status !== 200) throw { message };
  return data;
};
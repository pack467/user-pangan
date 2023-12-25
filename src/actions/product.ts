import type {
  Bank,
  CarrouselWithProduct,
  CheckoutPayload,
  PaymentType,
  ProductAttributesWithImages,
} from "../interfaces/product";
import type { BaseQuery } from "../interfaces/request";
import request from "../lib/axios";
import type { ThunkAction } from "redux-thunk";
import { type ProductAction, type ProductState } from "../reducers/product";
import {
  CHECKOUTWITHVA,
  GETALLCAROUSEL,
  GETALLPRODUCTS,
  UPDATETRANSACTIONSTATUS,
} from "../constant/product";
import { HTTPPOST } from "../constant";
import type { ChargeResp } from "../interfaces";
import type { TransactionAttributes } from "../interfaces/transaction";

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

export const checkoutProduct =
  (
    payload: CheckoutPayload[],
    paymentType: PaymentType,
    bank?: Bank
  ): ThunkAction<
    Promise<ChargeResp>,
    ProductState,
    ChargeResp,
    ProductAction
  > =>
  (dispatch) =>
    new Promise(async (resolve, reject) => {
      try {
        const {
          data: { message, data },
          status,
        } = await request.Mutation<ChargeResp>({
          url: `/product/${paymentType}`,
          method: HTTPPOST,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            items: payload,
            bank,
          },
        });

        if (status !== 201) throw { message };

        dispatch<any>({
          type: CHECKOUTWITHVA,
          payload: data,
        });

        resolve(data as ChargeResp);
      } catch (err) {
        reject(err);
      }
    });

export const getTransactionStatus =
  (
    signature: string
  ): ThunkAction<Promise<void>, ProductState, ChargeResp, ProductAction> =>
  async (dispatch) => {
    const {
      data: { data },
      status,
    } = await request.Query<TransactionAttributes>({
      url: `/transaction/process/${signature}`,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });

    if (status === 200)
      dispatch<any>({
        type: UPDATETRANSACTIONSTATUS,
        payload: data.status,
      });
  };

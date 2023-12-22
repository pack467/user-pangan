import { type ThunkAction } from "redux-thunk";
import { type CartAction, type CartState } from "../reducers/cart";
import request from "../lib/axios";
import { HTTPPOST } from "../constant";
import type { CartAttributes, CartWithProduct } from "../interfaces/cart";
import { ADDCARTS } from "../constant/cart";

export const addToCart =
  (productId: string): ThunkAction<Promise<void>, CartState, any, CartAction> =>
  async (dispatch) => {
    const {
      data: { data, message },
      status,
    } = await request.Mutation<CartAttributes>({
      url: `/cart/${productId}`,
      method: HTTPPOST,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });

    if (status !== 201) throw { message };

    dispatch<any>({
      type: ADDCARTS,
      payload: data,
    });
  };

export const getCart = (): Promise<CartWithProduct[]> =>
  new Promise(async (resolve) => {
    try {
      const {
        data: { message, data },
        status,
      } = await request.Query<CartWithProduct[]>({
        url: "/cart/",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (status !== 200) throw { message };

      resolve(data as CartWithProduct[]);
    } catch (err) {
      resolve([] as CartWithProduct[])
    }
  });

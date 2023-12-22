import { ThunkAction } from "redux-thunk";
import { HTTPPOST } from "../constant";
import { LoginPayload, RegisterPayload } from "../interfaces/user";
import request from "../lib/axios";
import { type UserAction, type UserState } from "../reducers/user";
import type { WalletAttributes } from "../interfaces/wallet";
import { GETMYWALLET } from "../constant/user";
import { Bank } from "../interfaces/product";
import { ChargeResp } from "../interfaces";
import { CHECKOUTWITHVA } from "../constant/product";

export const registerHandler = (payload: RegisterPayload): Promise<void> =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        status,
        data: { message },
      } = await request.Mutation({
        url: "/auth/register/user",
        method: HTTPPOST,
        data: payload,
      });

      if (status !== 201) throw { message };

      resolve();
    } catch (err) {
      reject(err);
    }
  });

export const loginHandler = ({
  email,
  password,
}: LoginPayload): Promise<string> =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { message, data },
        status,
      } = await request.Mutation<string>({
        url: "/auth/login",
        method: HTTPPOST,
        data: {
          email,
          password,
          as: "User",
        },
      });

      if (status !== 200) throw { message };

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

export const getWallet =
  (): ThunkAction<
    Promise<WalletAttributes | null>,
    UserState,
    any,
    UserAction
  > =>
  (dispatch) =>
    new Promise(async (resolve) => {
      const {
        data: { data },
        status,
      } = await request.Query<WalletAttributes>({
        url: "/wallet/me",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      const payload = status !== 200 ? null : data;

      dispatch<any>({
        type: GETMYWALLET,
        payload,
      });

      resolve(payload);
    });

export const TopUpWallet =
  (
    amount: number,
    bank: Bank
  ): ThunkAction<Promise<ChargeResp>, UserState, any, UserAction> =>
  (dispatch) =>
    new Promise(async (resolve, reject) => {
      try {
        const {
          data: { message, data },
          status,
        } = await request.Mutation<ChargeResp>({
          url: "/wallet/topup",
          method: HTTPPOST,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            amount,
            bank,
            payment_type: "Top Up",
          },
        });

        if (status !== 201) throw { message };

        dispatch<any>({ type: CHECKOUTWITHVA,payload:data });

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });

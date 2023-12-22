import { type Reducer } from "redux";
import type { WalletAttributes } from "../interfaces/wallet";
import { GETMYWALLET, TOPUPSUCCESS, type UserTypes } from "../constant/user";
import { ChargeResp } from "../interfaces";

export interface UserState {
  wallet: WalletAttributes | null;
  topup: ChargeResp | null;
}

export type UserAction<T = any> = {
  type: UserTypes;
  payload: T;
};

const initialState: UserState = { wallet: null, topup: null };

const reducer: Reducer<UserState, UserAction> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GETMYWALLET:
      return {
        ...state,
        wallet: payload,
      };
    case TOPUPSUCCESS:
      return { ...state, wallet: null, topup: payload };
    default:
      return state;
  }
};

export default reducer;

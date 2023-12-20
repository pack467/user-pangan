import { HTTPPOST } from "../constant";
import { RegisterPayload } from "../interfaces/user";
import request from "../lib/axios";

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

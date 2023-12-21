import { HTTPPOST } from "../constant";
import { LoginPayload, RegisterPayload } from "../interfaces/user";
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

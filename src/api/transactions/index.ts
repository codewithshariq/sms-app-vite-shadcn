import { makeApiRequest } from "..";
import { ITransaction } from "./types";

interface PostTransactionBody {
  sum: number;
  toUserId: string;
  fromUserId: string;
}

const TransactionsAPI = {
  get: () =>
    makeApiRequest<ITransaction[]>({
      method: "get",
      url: "/transactions",
    }),
  post: (data: PostTransactionBody) =>
    makeApiRequest({
      method: "post",
      url: "/transactions",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    }),
};

export default TransactionsAPI;

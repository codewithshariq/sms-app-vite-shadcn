import { Token } from "@stripe/stripe-js";
import { makeApiRequest } from "..";
import { StripePayment, StripeCard } from "./types";

interface CreateCardBody {
  token: Token;
  setDefault: boolean;
}

const DEFAULT_CARD_LS = "stripe-default-card";

export const setDefaultCardLs = (cardId: string) => {
  localStorage.setItem(DEFAULT_CARD_LS, cardId);
};

export const getDefaultCardLs = () => {
  return localStorage.getItem(DEFAULT_CARD_LS);
};

const StripeAPI = {
  cards: () =>
    makeApiRequest<StripeCard[]>({
      method: "get",
      url: "/stripe/cards",
    }),
  createCard: async ({ token, setDefault }: CreateCardBody) => {
    try {
      const response = await makeApiRequest({
        method: "post",
        url: "/stripe/cards",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          token: token.id,
          setDefault,
        }),
      });

      // store default card in localStorage on success response
      setDefaultCardLs(token.card?.id as string);

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  setDefaultCard: async (cardId: string) => {
    try {
      const response = await makeApiRequest({
        method: "post",
        url: "/stripe/cards/set-default",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ cardId }),
      });

      // store default card in localStorage on success response
      setDefaultCardLs(cardId);

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  invoices: () =>
    makeApiRequest({
      method: "get",
      url: "/stripe/my-invoices",
    }),
  price: () =>
    makeApiRequest({
      method: "get",
      url: "/stripe/price",
    }),
  payment: (quantity: number) =>
    makeApiRequest<StripePayment>({
      method: "post",
      url: "/stripe/payment",
      params: {
        quantity,
      },
    }),
};

export default StripeAPI;

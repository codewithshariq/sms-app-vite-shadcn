import { makeApiRequest } from "..";
import { PaginatedParams, PaginatedResponse } from "../general.types";
import { ISMS } from "./types";
import getSmsActiveLinesJson from "./mocks/get-sms-active-lines.json";

const SMSApi = {
  sms: (params?: PaginatedParams & { search: string }) =>
    makeApiRequest<PaginatedResponse<ISMS>>({
      method: "get",
      url: "/sms",
      params,
    }),
  "/sms/sub-user": ({ search, subUserId }: { search?: string; subUserId: string }) =>
    makeApiRequest<ISMS[]>({
      method: "get",
      url: `/sms/sub-user/${subUserId}`,
      params: {
        search,
      },
    }),
  activeLinesSms: (params?: PaginatedParams & { search: string }) =>
    // mock
    ({
      data: {
        data: getSmsActiveLinesJson,
      },
    }),

  // makeApiRequest<ISMS[]>({
  //   method: "get",
  //   url: "/sms/active-lines",
  //   params,
  // }),
};

export default SMSApi;

import { makeApiRequest } from "..";
import { PaginatedParams } from "../general.types";
import { getActiveLinesJsonMapped } from "./mocks/get-lines-json.helper";
import { ILine } from "./types";
import { getLines } from "./mocks/get-lines";
import { getLinesReportedJson } from "./mocks/get-lines-reported";

console.log("getLines", getLines);

const LinesAPI = {
  get: (params: PaginatedParams) => ({
    data: { ...getLines },
  }),
  // makeApiRequest<PaginatedResponse<ILineUsed>>({
  //   method: "get",
  //   url: "/lines",
  //   params,
  // }),
  getActive: (params: PaginatedParams) =>
    // mock
    ({
      data: {
        ...getActiveLinesJsonMapped(),
      },
    }),
  // makeApiRequest<PaginatedResponse<ILine>>({
  //   method: "get",
  //   url: "/lines/active",
  //   params,
  // }),
  getReported: (params: PaginatedParams) => ({
    data: { ...getLinesReportedJson },
  }),
  // makeApiRequest<PaginatedResponse<ILineUsed>>({
  //   method: "get",
  //   url: "/lines/reported",
  //   params,
  // }),
  post: (servicesIds: number[]) =>
    makeApiRequest<ILine>({
      method: "post",
      url: "/lines",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ servicesIds }),
    }),
  addServices: ({ lineId, servicesIds }: { lineId: string; servicesIds: number[] }) =>
    makeApiRequest<ILine>({
      method: "post",
      url: `/lines/${lineId}/add-services`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ servicesIds }),
    }),
  subUser: (id: string) =>
    makeApiRequest({
      method: "get",
      url: `/lines/sub-user/${id}`,
    }),
  prolong: ({ lineId, minutes }: { lineId: string; minutes: number }) =>
    makeApiRequest<ILine>({
      method: "post",
      url: `/lines/${lineId}/prolong/${minutes}`,
    }),

  report: ({ lineId, text }: { lineId: string; text: string }) =>
    makeApiRequest({
      method: "post",
      url: `/lines/${lineId}/report`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ text }),
    }),
  finishLine: (id: string) =>
    makeApiRequest({
      method: "delete",
      url: `/lines/${id}`,
    }),
};

export default LinesAPI;

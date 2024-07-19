import { makeApiRequest } from "..";
import getServicesJson from "@/api/services/mocks/get-services.json";

export type TService = {
  id: number;
  name: string;
  disabled: boolean;
  price: number;
};

const ServicesAPI = {
  get: (search: string) =>
    // mock
    ({
      data: getServicesJson,
    }),
  // makeApiRequest<TService[]>({
  //   method: "get",
  //   url: "/services",
  //   params: {
  //     search,
  //   },
  // }),
};

export default ServicesAPI;

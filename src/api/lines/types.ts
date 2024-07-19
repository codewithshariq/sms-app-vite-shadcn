import { Service } from "../services/types";
import { ISMS } from "../sms/types";

export type ILine = {
  id: string;
  createdAt: string;
  updatedAt: string;
  number: string;
  rentStartDate: string;
  rentEndDate: string;
  services: Service[];
  timeoutId: number;
  reported: boolean;
};

export type ILineUsed = ILine & {
  costSum: number;
};

export type ILineWithSms = ILine & {
  smses: ISMS[];
};

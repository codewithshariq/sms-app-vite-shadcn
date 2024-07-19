import { Service } from "../services/types";

export interface ISMS {
  id: string;
  createdAt: string;
  updatedAt: string;
  smsId: string;
  service: Service[];
  from: string;
  content: string;
  receivedAt: string;
  isWrongService: boolean;
  userPhoneId: string;
}

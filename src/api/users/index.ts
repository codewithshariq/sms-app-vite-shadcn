import { makeApiRequest } from "@/api";

import {
  ChangeEmailValues,
  ChangePasswordValues,
  CreateUserBody,
  UserCreateResponse,
  UserModel,
} from "./types";
import getMeJson from "@/api/users/mock/get-me.json";

export const createUser = async (data: CreateUserBody) =>
  makeApiRequest<UserCreateResponse>({
    method: "post",
    url: "/users/create",
    data: JSON.stringify(data),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const getUser = async () =>
  // makeApiRequest<UserModel>({
  //   method: "get",
  //   url: "/users/get-me",
  // });

  ({
    data: {
      ...getMeJson,
    },
  });

interface ChangeUsername {
  fullName: string;
  userName: string;
}
export const changeUsername = async (data: ChangeUsername) =>
  makeApiRequest<UserModel>({
    method: "post",
    url: "/users/change-names",
    data: JSON.stringify(data),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const changePassword = async (data: ChangePasswordValues) =>
  makeApiRequest<UserCreateResponse>({
    method: "post",
    url: "/users/change-password",
    data: JSON.stringify(data),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const activateUser = async (activateToken: string) =>
  makeApiRequest({
    method: "post",
    url: `/users/activate/${activateToken}`,
  });

export const resendEmailconfirmation = async (email?: string) =>
  makeApiRequest({
    method: "post",
    url: `/users/activate/resend${email ? `?email=${email}` : ""}`,
  });

export const changeEmail = async (values: ChangeEmailValues) =>
  makeApiRequest({
    method: "post",
    url: "/users/change-email",
    data: JSON.stringify(values),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const confirmChangeEmail = async (changeToken: string) =>
  makeApiRequest({
    method: "post",
    url: `/users/change-email/${changeToken}`,
  });

export const sendPasswordRestoreLink = async (email: string) =>
  makeApiRequest({
    method: "post",
    url: "/users/pass-restore",
    data: JSON.stringify({ email }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export type ConfirmRestorePasswordValues = {
  changeToken: string;
  password: string;
  repeatPassword: string;
};

export const confirmRestorePassword = async ({
  changeToken,
  ...body
}: ConfirmRestorePasswordValues) =>
  makeApiRequest({
    method: "post",
    url: `/users/pass-restore/${changeToken}`,
    data: JSON.stringify(body),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

type AccessKeyObjectResponse = {
  accessKey: string;
};

export const getApiAccessKey = async () =>
  makeApiRequest<AccessKeyObjectResponse>({
    method: "get",
    url: "/users/api-access",
  });

export const regenerateApiAccessKey = async () =>
  makeApiRequest<AccessKeyObjectResponse>({
    method: "post",
    url: "/users/api-access",
  });

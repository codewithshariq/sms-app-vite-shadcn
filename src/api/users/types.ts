export type UserModel = {
  balance: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
  userName: string;
  email: string;
  isEmailConfirmed: boolean;
  role: "Primary User" | "Sub User";
  stripeCustomerId: string;
  primaryUserId: null;
};

export type UserCreateResponse = UserModel;

export type CreateUserBody = {
  fullName: string;
  userName: string;
  email: string;
  password: string;
};

export type ChangePasswordValues = {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
};

export type ChangeEmailValues = {
  email: string;
  password: string;
};

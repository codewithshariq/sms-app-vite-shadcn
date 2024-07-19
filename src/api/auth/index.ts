import axiosInstance, { makeApiRequest } from "@/api";

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getAuthTokens = (): AuthResponse | null => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!!accessToken && !!refreshToken) {
    return {
      accessToken,
      refreshToken,
    };
  }
  return null;
};

export const removeAuthToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const isAuthenticated = () => {
  const accessToken = getAuthTokens();
  return !!accessToken; // Returns true if accessToken is present
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export interface LogInFormData {
  email: string;
  password: string;
}

export const logInUser = async (credentials: LogInFormData) => {
  try {
    const response = await makeApiRequest<AuthResponse>({
      method: "post",
      url: "/auth/login",
      data: credentials,
    });
    const { accessToken, refreshToken } = response.data;
    setAuthTokens(accessToken, refreshToken);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logOutUser = async () => {
  try {
    const response = await axiosInstance.post<AuthResponse>("/auth/logout");
    removeAuthToken();
    return response;
  } catch {
    removeAuthToken();
    throw Error("Logout failed");
  }
};

export const refreshAccessToken = async () => {
  const accessTokens = getAuthTokens();
  if (!accessTokens)
    return Promise.reject("Refresh accessToken is not provided");
  try {
    const response = await axiosInstance.get<AuthResponse>("/auth/refresh", {
      headers: {
        Authorization: `Bearer ${accessTokens.refreshToken}`,
      },
    });
    const { accessToken: newToken, refreshToken: newRefreshToken } =
      response.data;
    setAuthTokens(newToken, newRefreshToken);
    return response.data;
  } catch {
    return Promise.reject("Error with accessToken refreshing");
  }
};

export const resendEmailconfirmation = async (email?: string) => {
  return makeApiRequest({
    method: "post",
    url: `/users/activate/resend${email ? `?email=${email}` : ""}`,
  });
};

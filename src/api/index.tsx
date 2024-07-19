import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import { getAuthTokens, refreshAccessToken, removeAuthToken } from "@/api/auth";
import { ErrorResponse } from "./general.types";

export const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  timeout: 15000,
  baseURL,
});

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    if (error.response) {
      const message = error.response.data.message;
      return Promise.reject(Array.isArray(message) ? message.join(", ") : message);
    }
  }
  return Promise.reject("Unknown error");
};

export const makeApiRequest = async <T,>(
  request: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.request(request);
    return response;
  } catch (error) {
    return handleAxiosError(error);
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const tokens = getAuthTokens();
    if (tokens) {
      config.headers = {
        authorization: `Bearer ${tokens.accessToken}`,
        ...config.headers,
      } as unknown as AxiosRequestHeaders;
    }

    if (config.method == "post") {
      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...config.headers,
      } as unknown as AxiosRequestHeaders;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const forceLogout = (): Promise<string> => {
  removeAuthToken();
  window.location.href = "/auth/sign-in";
  return Promise.reject("No tokens logout");
};

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const tokens = getAuthTokens();
        if (!tokens) return forceLogout();
        // if refresh request
        if (["/auth/refresh"].includes(error.config?.url)) return forceLogout();

        // Token expired, try to refresh the tokens
        try {
          await refreshAccessToken();

          // Retry the original request with the new access token
          const config = error.config;
          config.headers["Authorization"] = `Bearer ${tokens.accessToken}`;

          return axiosInstance(config);
        } catch (refreshError) {
          // Handle the refresh token request error
          return forceLogout();
        }
      } else {
        // Handle other response errors here if needed
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

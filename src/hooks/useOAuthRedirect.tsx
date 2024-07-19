import { setAuthTokens } from "@/api/auth";
import { AuthSliceState, useAuthState } from "@/store/slices/authSlice";
import { decodeJwt } from "jose";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useOAuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const { setAuthData } = useAuthState();
  const redirect = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");

    if (!accessToken || !refreshToken) return;

    setAuthTokens(accessToken, refreshToken);

    const decodedJwt = decodeJwt(accessToken);

    setAuthData({ role: decodedJwt.role as AuthSliceState["role"] });

    redirect("/");
  }, [searchParams, setAuthData, redirect]);
};

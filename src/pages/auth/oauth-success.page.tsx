import { useOAuthRedirect } from "@/hooks/useOAuthRedirect";

export default function OauthSuccessPage() {
  useOAuthRedirect();

  return <></>;
}

import { useState } from "react";
import RestorePasswordForm, {
  RestorePasswordFormData,
  RestorePasswordModalState,
} from "@/components/auth/restore-password-form";
import { sendPasswordRestoreLink } from "@/api/users";
import { Card, CardContent } from "@/components/ui/card";
import { SocilaLoginWithSignInLinkPart } from "@/components/auth/social-logins-with-sign-in-link-part";

export const PassRestorePage = () => {
  const [state, setState] = useState<RestorePasswordModalState>("idle");

  const handleRestore = ({ email }: RestorePasswordFormData) => {
    setState("pending");
    sendPasswordRestoreLink(email)
      .then(() => setState("success"))
      .catch(() => setState("error"));
  };

  return (
    <Card className="w-[400px] sm:min-w-[460px]">
      <CardContent className="border-border border drop-shadow-card ">
        <RestorePasswordForm state={state} onSubmit={handleRestore} />
        <SocilaLoginWithSignInLinkPart />
      </CardContent>
    </Card>
  );
};

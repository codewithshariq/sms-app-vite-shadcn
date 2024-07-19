import { TypographyMuted, TypographyTitleAuth } from "@/components/ui/typography";
import ConfirmEmailBtn from "@/components/auth/confirm-email-btn";
import { Card, CardContent } from "@/components/ui/card";
import { SocilaLoginWithSignInLinkPart } from "@/components/auth/social-logins-with-sign-in-link-part";

export default function Page() {
  return (
    <Card className="sm:min-w-[460px]">
      <CardContent className="border-border border drop-shadow-card">
        <div className="flex flex-col space-y-2 text-center">
          <TypographyTitleAuth>Email Confirmation Required</TypographyTitleAuth>
          <TypographyMuted>Please check your email for a confirmation link.</TypographyMuted>
          <TypographyMuted>You can close this page after confirmation.</TypographyMuted>
          <ConfirmEmailBtn />
        </div>

        <SocilaLoginWithSignInLinkPart />
      </CardContent>
    </Card>
  );
}

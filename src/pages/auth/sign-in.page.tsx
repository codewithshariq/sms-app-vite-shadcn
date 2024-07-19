import { TypographyTitleAuth } from "@/components/ui/typography";
import { UserSignInForm } from "@/components/auth/user-sign-in-form";
import { Card, CardContent } from "@/components/ui/card";
import {
  HaveAccountOrSignUpLinkPart,
  OrSeparator,
  SocialLoginsPart,
} from "@/components/auth/social-logins-with-sign-in-link-part";

export default function SignInPage() {
  return (
    <Card className="sm:min-w-[460px]">
      <CardContent className="border-border border drop-shadow-card">
        <div className="flex flex-col space-y-2 text-center">
          <TypographyTitleAuth>Sign In</TypographyTitleAuth>
        </div>
        <UserSignInForm />

        <OrSeparator />

        <SocialLoginsPart />

        <HaveAccountOrSignUpLinkPart
          haveAccountText="Don't have an account?"
          signInOrUpLink="/auth/sign-up"
          signInOrUpText="Sign Up"
        />
      </CardContent>
    </Card>
  );
}
